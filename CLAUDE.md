# Brief for Claude Code: No Pise La Grama Site Improvements, Round 1

You are working in a local copy of No Pise La Grama's Shopify theme: Palo Alto 9.2.0 by Presidio Creative, with a few custom sections (`how-to-care`, `porpuse`, `stores`) and a `custom.css` that loads the brand fonts.

## Goal
Update the homepage, collection template and product template to match the approved mock-ups.
- **Source of truth for structure, copy and styling:** `BUILD-SPEC.md`.
- **Visual reference:** the HTML in `prototype/` (open `prototype/index.html`). Treat it as reference only and do not copy its markup into the theme; it is rendered by a small script, not by Liquid.

## Rules
- **Settings before code.** Most of this round is theme settings: header alignment, transparent and sticky header, menu weight, uppercase buttons, infinity scroll, sticky product form. Inspect `config/settings_schema.json` and each section's schema and use existing settings wherever they achieve the design.
- **Reuse before you build.** Use Palo Alto's sections: `section-image`, `section-text`, `section-list-collection`, `section-shop-the-look-banner` / `section-products-with-image`, `section-press`, `section-image-with-text`, `section-social-gallery`, `collection`, `product`, `related-products`.
- **Keep custom code separate.** Put all custom code in new files only:
  - `sections/nplg-*.liquid` and `snippets/nplg-*.liquid`
  - `assets/nplg-custom.css` (load it after the existing `custom.css`)

  Do not edit Palo Alto core files unless unavoidable. If a core edit is needed, keep it minimal, comment it, and list it in a summary. Leave the client's existing `custom.css` intact apart from the font fix below.
- **Start from the starter code.** Begin with `theme-starter/` and adapt it to the real markup. Selectors marked `VERIFY` in `nplg-custom.css` are guesses at Palo Alto's class names.
- **Fonts:** use only HV Harietta (headings) and Californian FB (everything else), as loaded in `custom.css`. Both are Regular only: no bold. Fix the Harietta `@font-face`: the uploaded `.woff2` is actually a Type 1 font; replace it with a real WOFF2 or drop it from the `src` list so the working `.woff` loads directly.
- **Keep their language:** collection names use their own codes (Collection FW26, Collection R26, Collection SS26). Follow the capitalisation rule in the spec.
- **Keep accessibility:** alt text on all images, decorative graphics `aria-hidden`, visible focus states, 44px touch targets, and text contrast of at least 4.5:1 (the soft shade behind the white homepage header exists for this reason).
- **Content lives in the admin:** menus, collections, product types and images are set up in Shopify admin. Reference collections by handle in template JSON using the handles in the spec, and flag anything that needs to be created.

## Workflow
1. **Plan first.** Read `BUILD-SPEC.md`, then explore the theme. Report back with a plan before editing:
   - which spec item maps to which existing section or setting
   - what needs custom code
   - any core files you would need to touch
2. **Build.** Header and menus first, then the homepage, then the collection and product templates.
3. **Check.** Preview with `shopify theme dev` and compare against `prototype/index.html`, `collection.html` and `product.html` at 1512px, 1280px and 390px wide. On the homepage check: the menu sits over the banner and fills in on scroll; the intro and category tiles read as one cream panel; the two looks have no gap and the orchids never cover the photos; nothing scrolls sideways on a phone.
4. **Summarize.** List every file created or changed, every setting to configure in the theme editor, and any open questions.
