# No Pise La Grama Site Improvements, Round 1: Developer Handoff

Approved mock-ups and build materials for the homepage, collection page and product page updates on No Pise La Grama's Shopify store (Palo Alto 9.2.0, with custom sections).

## What's in this folder

| Path | What it is |
|---|---|
| `BUILD-SPEC.md` | **Start here.** Section-by-section build plan: which Palo Alto section or setting to use, styles, copy, products, images, the menu, and the catalog clean-up. |
| `prototype/` | The approved mock-ups as standalone HTML. Open `index.html` in any browser (Chrome, Safari, Firefox); each page is pre-rendered, so it displays fully even if scripts are blocked. Pages link to each other; the Shop and Discover menus open on hover, the header fills in on scroll, the picks carousel, category chips, sizes and "Complete the Set" all work. Category pages open as `collection.html?category=Tops` and so on. One responsive file per page: check it at desktop and phone widths. **Reference only, not production code.** |
| `assets/images/` | Full-size originals of every image the design uses, from No Pise La Grama's own store photography (source URLs in the spec). |
| `assets/svg/` | The line-drawn orchid as an SVG file. |
| `theme-starter/` | Starter code for the few non-native pieces: `nplg-custom.css`, the `nplg-looks` section (two looks + orchids), and the `nplg-orchid` snippet. Written against standard Palo Alto conventions and **not yet tested in their theme**. Check selectors against the real markup. |
| `CLAUDE.md` | Brief for building with Claude Code, if used. |

## Recommended workflow
1. **Work on a copy.** Duplicate the live theme in Shopify and work on the copy only; never edit the live theme.
2. **Pull it locally.** Run `shopify theme pull` on the copy into a git repo.
3. **Build.** Set the theme settings, menus and collections, then build the homepage, collection and product templates per `BUILD-SPEC.md`, reusing Palo Alto sections wherever possible. Keep all custom code in new `nplg-*` files and `nplg-custom.css`, so Palo Alto updates don't overwrite it.
4. **Preview locally.** Run `shopify theme dev` and compare against the prototype.
5. **Share for review.** Push the copy back unpublished (`shopify theme push --unpublished`) and send the preview link for review.

## Notes
- **Mostly settings.** Most of this round is theme settings and admin set-up (menus, collections, product types). Custom code is limited to the looks section with the orchids, a few styles, and the Harietta font fix.
- **Fonts:** HV Harietta and Californian FB are already in the theme via `custom.css`, and the prototype uses the same font files, so it renders true to the brand. They are licensed fonts: don't publish the prototype folder publicly without checking the license.
- **Draft copy:** the Resort Collection paragraph and the Instagram headline ("From Caracas, with love") are drafts until the client approves them.
- **Out of scope this round:** cart-abandonment emails, pre-orders and visual search.
