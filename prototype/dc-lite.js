/* dc-lite.js — renders the mockup templates on any static host (GitHub Pages, Netlify, etc.).
   Each page holds: <template id="dc-template"> (markup with {{holes}}, <sc-for>, <sc-if>)
   and <script type="text/x-dc" id="dc-logic" data-props='…'> (a Component class).
   URL query parameters override props, e.g. collection.html?category=Tops */
(function () {
  var root, tpl, inst, scheduled = false;

  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    var next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
    if (!next) return;
    var changed = false, self = this;
    Object.keys(next).forEach(function (k) { if (self.state[k] !== next[k]) changed = true; });
    if (!changed) return;
    this.state = Object.assign({}, this.state, next);
    schedule();
  };
  DCLogic.prototype.forceUpdate = function () { schedule(); };
  window.DCLogic = DCLogic;

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () { scheduled = false; render(); });
  }

  function lookup(scope, path) {
    path = path.trim();
    if (path === 'true') return true;
    if (path === 'false') return false;
    var parts = path.split('.'), base, i;
    for (i = 0; i < scope.length; i++) {
      if (scope[i] != null && Object.prototype.hasOwnProperty.call(Object(scope[i]), parts[0])) { base = scope[i]; break; }
    }
    if (base === undefined) return undefined;
    var v = base;
    for (i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }

  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g, ONLY = /^\{\{\s*([^}]+?)\s*\}\}$/;
  function interp(str, scope) {
    return str.replace(HOLE, function (_, p) { var v = lookup(scope, p); return v == null ? '' : String(v); });
  }
  function resolve(str, scope) {
    var m = str && str.trim().match(ONLY);
    return m ? lookup(scope, m[1]) : str;
  }

  function renderChildren(node, scope, parent) {
    for (var c = node.firstChild; c; c = c.nextSibling) renderNode(c, scope, parent);
  }

  function renderNode(node, scope, parent) {
    if (node.nodeType === 3) { parent.appendChild(document.createTextNode(interp(node.nodeValue, scope))); return; }
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'helmet') return;
    if (tag === 'sc-for') {
      var list = resolve(node.getAttribute('list'), scope) || [], as = node.getAttribute('as') || 'item';
      for (var i = 0; i < list.length; i++) {
        var frame = {}; frame[as] = list[i]; frame[as + 'Index'] = i;
        renderChildren(node, [frame].concat(scope), parent);
      }
      return;
    }
    if (tag === 'sc-if') {
      if (resolve(node.getAttribute('value'), scope)) renderChildren(node, scope, parent);
      return;
    }
    var el = document.createElementNS(node.namespaceURI, tag);
    for (var a = 0; a < node.attributes.length; a++) {
      var at = node.attributes[a], name = at.name, val = at.value;
      if (name.indexOf('hint-') === 0) continue;
      if (name.length > 2 && name.indexOf('on') === 0 && ONLY.test(val.trim())) {
        var fn = resolve(val, scope);
        if (typeof fn === 'function') { el.__dcOn = el.__dcOn || {}; el.__dcOn[name.slice(2).toLowerCase()] = fn; }
        continue;
      }
      el.setAttribute(name, interp(val, scope));
    }
    renderChildren(node.localName === 'template' ? node.content : node, scope, el);
    parent.appendChild(el);
  }

  function dispatch(e) { var h = this.__dcOn && this.__dcOn[e.type]; if (h) h(e); }
  function bind(el) {
    if (!el.__dcOn) return;
    el.__dcBound = el.__dcBound || {};
    Object.keys(el.__dcOn).forEach(function (t) { if (!el.__dcBound[t]) { el.addEventListener(t, dispatch); el.__dcBound[t] = true; } });
  }
  function bindAll(node) {
    if (node.nodeType !== 1) return;
    bind(node);
    for (var c = node.firstChild; c; c = c.nextSibling) bindAll(c);
  }
  function morph(oldP, newP) {
    var o = Array.prototype.slice.call(oldP.childNodes), n = Array.prototype.slice.call(newP.childNodes), i;
    for (i = 0; i < n.length; i++) {
      var a = o[i], b = n[i];
      if (!a) { bindAll(b); oldP.appendChild(b); continue; }
      if (a.nodeType !== b.nodeType || (a.nodeType === 1 && (a.localName !== b.localName || a.namespaceURI !== b.namespaceURI))) {
        bindAll(b); oldP.replaceChild(b, a); continue;
      }
      if (a.nodeType === 3) { if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue; continue; }
      if (a.nodeType !== 1) continue;
      var j, at;
      for (j = a.attributes.length - 1; j >= 0; j--) { at = a.attributes[j].name; if (!b.hasAttribute(at)) a.removeAttribute(at); }
      for (j = 0; j < b.attributes.length; j++) { at = b.attributes[j]; if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value); }
      a.__dcOn = b.__dcOn; bind(a);
      morph(a, b);
    }
    for (i = o.length - 1; i >= n.length; i--) oldP.removeChild(o[i]);
  }
  function render() {
    var vals = (inst.renderVals && inst.renderVals()) || {};
    var frag = document.createElement('div');
    renderChildren(tpl.content, [vals], frag);
    morph(root, frag);
  }

  function boot() {
    root = document.getElementById('dc-root');
    tpl = document.getElementById('dc-template');
    var logic = document.getElementById('dc-logic');
    // move <helmet> styles and font links into <head>
    var helmet = tpl.content.querySelector('helmet');
    if (helmet && !document.head.querySelector('[data-dc-helmet]')) Array.prototype.forEach.call(helmet.children, function (n) { document.head.appendChild(n.cloneNode(true)); });
    // props: declared defaults, overridden by ?query parameters
    var decl = {}, props = {};
    try { decl = JSON.parse(logic.getAttribute('data-props') || '{}'); } catch (e) { decl = {}; }
    Object.keys(decl).forEach(function (k) { if (k.charAt(0) !== '$' && decl[k] && 'default' in decl[k]) props[k] = decl[k]['default']; });
    new URLSearchParams(location.search).forEach(function (v, k) { props[k] = v; });
    var Component = new Function('DCLogic', logic.textContent + '\nreturn Component;')(DCLogic);
    inst = new Component(props);
    inst.props = props;
    if (!inst.state) inst.state = {};
    render();
    if (typeof inst.componentDidMount === 'function') inst.componentDidMount();
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
