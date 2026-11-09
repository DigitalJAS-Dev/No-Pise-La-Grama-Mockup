# No Pise La Grama Site Improvements, Round 1: Build Spec

**Store:** nopiselagrama.com (`no-pise-la-grama-web.myshopify.com`)  
**Theme:** Palo Alto 9.2.0 (Presidio Creative), with custom sections (`how-to-care`, `porpuse`, `stores`) and a `custom.css` that sets the brand fonts. Confirm every section name and setting below against the actual theme files before building.  
**Reference:** open the files in `prototype/` in a browser. They are the approved mock-ups, not production code.

> Scope: homepage, collection template and product template, plus the menu and catalog clean-up they depend on. Cart-abandonment emails, pre-orders and visual search are a later round.

---

## 1. Design tokens

### Colours

| Token | Hex | Use |
|---|---|---|
| Ink | `#2B2B2B` | Text, menu, icons, buttons, line art |
| Body | `#45413C` | Paragraphs, captions, prices |
| Muted | `#5E5A55` | Overlines, labels, breadcrumbs |
| Cream | `#F1EADF` | Header (once filled), intro panel + category tiles, footer |
| Promo | `#E3D8C6` (text `#3A352F`) | Announcement bar |
| Stone | `#F3EFEA` | Archive band, image placeholders |
| Hairline | `#E4E0DA` | Dividers, filter rules |

Optional header colours shown in the prototype (`?headerTone=`): Grass green `#2E3B2C`, Bordeaux `#5A1E2A`, White. Cream is the recommendation.

### Type (fonts already loaded by the theme's `custom.css`)

| Element | Font | Size (desktop / mobile) | Notes |
|---|---|---|---|
| Hero headline | HV Harietta 400 | 42px / 30px | Sentence case, one line on desktop |
| Section headings | HV Harietta 400 | 44px / 32px | "Our favorite picks for the season", "From Caracas, with love" |
| The Resort Collection | HV Harietta 400 | 40px / 30px | One line |
| Product title (PDP) | HV Harietta 400 | 32px | No collection overline above it |
| All Harietta | | | `word-spacing: -0.22em` (its word space is 0.5em) |
| Menu (New Arrivals, Shop, Discover) | Californian FB | 18px | Title Case, no extra tracking, Normal weight |
| Body copy | Californian FB | 17–18px | Sentence case |
| Buttons | Californian FB | 14px | UPPERCASE, letter-spacing 0.12em, square, solid `#2B2B2B` or 1px outline |
| Overlines / labels | Californian FB | 12–13px | UPPERCASE, letter-spacing 0.16–0.18em, muted |
| Product names in grids | Californian FB | 13px | UPPERCASE, letter-spacing 0.1em (names are stored in caps) |

**Capitalisation rule:** overlines, labels and buttons UPPERCASE; menu, footer and filter links Title Case; headlines and body copy sentence case.

**Weights:** both fonts are uploaded in Regular only. Keep everything at 400; a browser-faked bold looks smudgy. If the client licenses **Californian FB Bold**, upload it and use it for the menu (see `nplg-custom.css`).

### Layout
- Content max-width **1360px**; header side padding `clamp(20px, 2.5vw, 40px)` so the menu and icons sit near the screen edges.
- Header height on the homepage **76px**, menu sitting **18px** below the announcement bar.
- Underlines appear **only on hover** (menu, dropdown links, category tile labels), plus on Shop/Discover while their dropdown is open.
- Below **860px**: header collapses to menu icon + logo (20px tall) + bag; decorative orchids hide.

---

## 2. Global settings (Theme settings, native)

| Where | Setting | Value |
|---|---|---|
| Typography › Navigation | Weight | **Normal** (currently Bold) |
| Typography › Buttons | Uppercase | **On** (currently off) |
| Colors › Header | Background | `#F1EADF` |
| Colors › Header | Transparent navigation | White (keep) |
| Product grid | Enable infinity scroll | **On** (currently off) |

---

## 3. Header and menus (all templates)

| # | Item | Palo Alto | Effort |
|---|---|---|---|
| 1 | Announcement bar | `announcement-bar` | Native |
| 2 | Header layout | `header` | Native + CSS |
| 3 | Main menu | Navigation (admin) | Native |

**1. Announcement bar.** One message: "Complimentary shipping on US orders over $500". Background `#E3D8C6`, text `#3A352F`. Remove the 10% offer from the bar.

**2. Header** (`sections/header.liquid` settings):
- **Alignment:** "Links | Logo | Icons" (menu left, logo centred, icons right).
- **Enable transparent header:** on (already). On the homepage the white logo and white menu sit directly over the banner; add the soft top shade from `nplg-custom.css` so they read on the light gallery wall.
- **Enable sticky header:** on (already). Once scrolled, the bar fills with `#F1EADF` and switches to the dark-grey logo.
- **Show country selector:** on ("USD $"), keep it.
- Menu items: 18px, Normal weight, Title Case, no down arrows; dropdowns open on hover; underline on hover/open only (CSS).

**3. Main menu** (Online Store › Navigation). Replace the current menu; every link must resolve (the live mobile menu has 11 links pointing to `#`).

- **New Arrivals** → new arrivals collection
- **Shop**
  - *Shop by category:* Dresses, Tops, Skirts & Pants, Matching Sets, Jackets, Belts, Shop All
  - *Collections:* Collection FW26, Collection R26, Collection SS26, The Core Collection Capsule, The Archive (last, muted)
- **Discover**
  - *About us:* No Pise La Grama's Purpose, The Founder: Daniela Panaro, Press, Nplg Women
  - *Help:* Know Your Size, How To Care, Shipping & Returns, Contact Us
  - *Card:* Stores, "Visit our flagship in Caracas" (mega-menu image/promo block; verify Palo Alto supports a promo block in the dropdown)

Note: "Collection SS26" currently links to `/collections/spring-summer-25`. Confirm with the client.

---

## 4. Homepage (`templates/index.json`)

Effort: **Native** = theme editor only · **CSS** = needs `nplg-custom.css` · **Custom** = new section (starter code in `theme-starter/`).

| # | Section | Palo Alto section (verify) | Effort |
|---|---|---|---|
| 1 | Banner | `section-image` (Image) | Native |
| 2 | Intro text | `section-text` (Text) | Native |
| 3 | Category tiles | `section-list-collection` (Collection list) | Native + CSS |
| 4 | FW26 looks pair | `nplg-looks` | Custom |
| 5 | Our favorite picks | `section-shop-the-look-banner` or `section-products-with-image` | Native |
| 6 | As seen in | `section-press` | Native + CSS |
| 7 | The Resort Collection | `section-image-with-text` | Native |
| 8 | Instagram | `section-social-gallery` | Native + CSS |
| 9 | Footer | `footer` | Native |

**1. Banner.** `home-banner-gracias-dress.jpg`, full width, shown **uncropped** (her feet visible). If the section has no "adapt to image" height, use the tallest option and set the image focal point on her upper body so her head sits well below the centred logo. No text on the image. Alt: "Gracias Dress in Burgundy, photographed in a gallery". Option shown in the prototype (`?heroLayout=Two+images`): model + product shot of the Argento set (`Split images`).

**2. Intro text**, centred, cream (`#F1EADF`) colour scheme, 56px top / 48px bottom padding:
- Overline: "Discover the new season · Fall Winter 26"
- Headline: "A love letter to leisure and seasonal scapes" (one line on desktop)
- Copy: "Fluid silhouettes, delicate fringe and prints inspired by the flora of Venezuela, cut in the deep bordeaux and maroon of the new season."
- Button: "Explore the collection" → `/collections/fall-winter-2026`

**3. Category tiles.** Same cream colour scheme as the intro so the two read as one panel, **no heading**. Four collections, each a white card with an uncropped product shot (ratio 2:3, contain) and an uppercase label underneath that underlines on hover. Add class `nplg-tiles` (custom CSS class setting, or wrap) for the CSS hooks.

| Label | Collection | Image |
|---|---|---|
| Dresses | `dresses` | `tile-dresses-bromelia.jpg` |
| Tops | `tops` | `argento-bodysuit-product.jpg` |
| Skirts & Pants | `skirts-pants` (new) | `tile-skirts-agustina.jpg` |
| Matching Sets | `matching-sets` (new) | `tile-sets-atenea.jpg` |

**4. FW26 looks pair** (Custom: `theme-starter/sections/nplg-looks.liquid`).
- Two full-length photos side by side, **no gap, no border**, max 1000px wide with ~190px of white margin each side; on smaller laptops the pair narrows to keep that margin.
- Left: `looks-gracia-top.jpg` → Gracia Top in Black. Right: `looks-morrocoy-vainilla.jpg` → Morrocoy Top in Vainilla Venezuela Print. The models lean toward each other.
- Captions under each photo (product name, plain text link). No CTA.
- **Orchids:** six line-drawn orchids (`snippets/nplg-orchid.liquid`, `assets/svg/orchid.svg`), dark grey: four in the outer margins, two tucked partly behind the photos. Positions are relative to the photo pair. Hidden below 860px.

**5. Our favorite picks for the season.** Heading centred above. Split layout: left half cream panel with the model photo inset (4:5); right half white with the product shot, prev/next arrows, name (Harietta 26px), print (muted), price, a full-width "Shop now" button and dots.

| Slide | Product | Model | Product shot |
|---|---|---|---|
| 1 | `olympia-dress-in-maroon-venezuela-print` | `picks-olympia-model.jpg` | `picks-olympia-product.jpg` |
| 2 | `argento-bodysuit-in-maroon` | `home-banner-argento-set-model.jpg` | `argento-bodysuit-product.jpg` |
| 3 | `florencia-pants-in-maroon-sequins` | `home-banner-argento-set-model.jpg` | `picks-florencia-product.jpg` |
| 4 | `mosaico-skirt-in-bordeaux-venezuela-print` | `picks-mosaico-set-model.jpg` | `picks-mosaico-product.jpg` |

Check which of the two Palo Alto sections gives the closest result; if neither supports a per-slide model image, use `section-products-with-image` with one model image.

**6. As seen in.** Existing press logos (Vogue, L'Officiel, InStyle, Elle), centred, **no rules above or below**.

**7. The Resort Collection.** Image left (`resort-feature-lavender-rocks.jpg`), text right on cream.
- Headline: "The Resort Collection" (one line). No overline.
- Copy (**draft, client to approve**): "Made for warm escapes: lavender fringe that moves with the sea breeze, jardin prints, garden embroidery and crisp white eyelet, inspired by the coast and gardens of Venezuela."
- Button: "Shop Collection" → `/collections/resort-26`

**8. Instagram.** Headline "From Caracas, with love" (**draft**), link "Follow us on Instagram @nopiselagrama" → https://www.instagram.com/nopiselagrama/. 4 × 2 grid, **no gaps**, max 1000px wide, centred. The prototype uses campaign photos as stand-ins; use the latest posts (manual upload or an Instagram feed app).

**9. Footer.** Cream background. Link columns left: Shop (New Arrivals, Dresses, Tops, Skirts & Pants, Shop All), Customer Care (Shipping Policy, Returns & Exchanges, FAQs, Contact Us; fix the live "Costumer Care" typo), Discover, Follow. **Newsletter block on the right**: "Let's keep in touch", one line of copy, email field + "Subscribe" button. The separate keep-in-touch section is removed.

---

## 5. Collection template (`templates/collection.json`)

`sections/collection.liquid` settings: **Enable filters** on (already), **Enable sorting** on, **Show breadcrumbs** on; infinity scroll from global settings.

1. **Breadcrumb + title**: "Home / Shop / {Collection}", title in Harietta 52px.
2. **Category chips** under the title: All, Dresses, Tops, Skirts & Pants, Matching Sets, Jackets. Each is a link to its collection; current one filled `#2B2B2B`. Try `subcollections` or a menu-driven block first; otherwise Custom.
3. **Filters** (Search & Discovery): Category, Dress length (Maxi/Midi/Mini), Size (XS–XL and 0–10), Color (grouped: White & Ecru, Pinks, Blues, Greens, Yellows, Lavender, Burgundy, Black, Metallics, Prints), Collection (FW26, R26, SS26, The Core Collection Capsule), Occasion (Day, Evening), Availability ("In Stock Only").
4. **Grid**: 4 columns desktop, product shots on white, uppercase names, price. Badge **"New Arrival"** on new-season pieces (badge by tag `new-arrival` or the theme's badge setting; verify). No "Complete the Set" badge.
5. **Scroll-and-load** via infinity scroll; no page numbers.
6. **Archive band** at the bottom (stone `#F3EFEA`): "From the Archive" / "Pieces from past collections" / button "Explore the Archive" + two archived pieces marked "Archived · Shop similar" (`archive-luciernaga.jpg`, `archive-guayaba-canario.jpg`).

---

## 6. Product template (`templates/product.json`)

| Item | How | Effort |
|---|---|---|
| Photos stacked on the left | `product` › Desktop layout **Stacked** (already) | Native |
| Details pinned on the right while scrolling | `product` › **Enable sticky form** (currently off) | Native |
| No collection overline; title 32px | CSS | CSS |
| Complete the Set (Toledo Top ↔ Mosaico Skirt) | Complementary products block + Search & Discovery; one-click set price via Shopify Bundles | Native / app |
| Sold-out size → "Notify me" | Back-in-stock app | App |
| You may also like | `related-products` | Native |

Ask the client for 3–4 images per hero product (front, back, detail, worn) so the stacked layout feels full.

---

## 7. Content to set up in Shopify admin

**Product types** (19 today → 6). Length becomes a tag/metafield, not a type.

| Current type (count) | New type |
|---|---|
| Dresses (85), Maxi dress (25), Mini dress (21), Midi dress (9), DRESSES (5) | **Dresses** + length tag |
| Tops (68), Top (8), Tops, Sets (8), SHIRT (3), TSHIRT (3) | **Tops** |
| Skirt (3), Skirt, Sets (2), Bottoms (60) and BOTTOMS (8) that are skirts | **Skirts** |
| Pants (2), Short (6), Bottoms/BOTTOMS that are pants or shorts | **Pants & Shorts** |
| Jackets (7) | **Jackets** |
| Belts (1) | **Belts** |
| (blank) (30) | assign one of the above |

**Collections:** `dresses`, `tops`, `skirts-pants` (Skirts + Pants & Shorts), `matching-sets` (tag `matching-set` on both pieces of each set), `jackets`, `belts`, new arrivals, `the-archive` (automated, sold-out past pieces; Shopify Flow moves pieces in when they sell out for good).

**Data fixes found during the audit:**
- Product at `/products/arbolada-dress-embroidery-garden-off-white-copy` is titled "Bromelia Dress Mini…": fix title or handle.
- `/products/morrocy-top-in-vainilla-venezuela-print`: handle misspelled ("morrocy"); add a redirect if changed.
- Toledo Top in Bordeaux Venezuela Print has no description.

**Images:** full-size originals in `assets/images/`, all from No Pise La Grama's own store photography:

| File | Used for | Source product | Original URL |
|---|---|---|---|
| `home-banner-gracias-dress.jpg` | Homepage banner (one-image option, default) | `gracias-dress-in-burgundy` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Gracias_Dress_In_Burgundy.jpg |
| `home-banner-argento-set-model.jpg` | Two-image banner option (left); picks carousel: Argento and Florencia slides | `argento-bodysuit-in-maroon` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Argento_Bodysuit_and_Florencia_Pants_In_Maroon.png |
| `argento-bodysuit-product.jpg` | Two-image banner option (right); Tops tile; picks carousel product shot | `argento-bodysuit-in-maroon` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/ArgentobodysuitMaroon_1.png |
| `tile-dresses-bromelia.jpg` | Category tile: Dresses | `bromelia-dress-in-maroon-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/BromeliadressinMaroonVenezuelaPrint_1_eb1a5d5d-7b45-43b3-a0f1-6bf2f4ca834a.png |
| `tile-skirts-agustina.jpg` | Category tile: Skirts & Pants | `agustina-skirt-in-vainilla-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Agustina_skirt_in_vainilla_venezuela_print_1.jpg |
| `tile-sets-atenea.jpg` | Category tile: Matching Sets | `atenea-tailored-jacket-suit-in-bordeaux-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Ateneatailoredjacketsuitinbordeauxacuarelleprint.jpg |
| `looks-gracia-top.jpg` | FW26 looks pair (left) | `gracia-top-in-black` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/GRACIA_TOP_IN_BLACK..png |
| `looks-morrocoy-vainilla.jpg` | FW26 looks pair (right) | `morrocy-top-in-vainilla-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/A918C4B0-9DE9-43C1-AA8D-D900F5811753_2.jpg |
| `picks-olympia-model.jpg` | Picks carousel: Olympia (model) | `olympia-dress-in-maroon-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Olympia_dress_in_maroon_venezuela_print_..png |
| `picks-olympia-product.jpg` | Picks carousel: Olympia (product) | `olympia-dress-in-maroon-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Olympiadressinmaroonvenezuelaprint_4.jpg |
| `picks-florencia-product.jpg` | Picks carousel: Florencia (product) | `florencia-pants-in-maroon-sequins` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/florencia_pants_in_maroon_fw26.jpg |
| `picks-mosaico-set-model.jpg` | Picks carousel: Mosaico (model); product page photo 1 | `mosaico-skirt-in-bordeaux-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/TOLEDO_TOP_Y_MOSAICO_SKIRT_IN_BORDEAUX_VZLA_PRINT.png |
| `picks-mosaico-product.jpg` | Picks carousel: Mosaico (product); product page photo 2 | `mosaico-skirt-in-bordeaux-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Mosaicoskirtinbordeauxvenezuelaprint.jpg |
| `resort-feature-lavender-rocks.jpg` | The Resort Collection feature | `sol-skirt-in-lavender` | https://cdn.shopify.com/s/files/1/0326/9361/6775/products/DeltaTopandSolSkirtinLavender-NPLGSS23.jpg |
| `instagram-r26-duo.jpg` | Instagram grid | `delta-top-in-lavender` | https://cdn.shopify.com/s/files/1/0326/9361/6775/products/ElMorroDress_DeltaTopandSolSkirt-NPLGSS23_2c8cd424-bb1f-4eb6-8b50-e20da9255feb.jpg |
| `instagram-marcela-jacket.jpg` | Instagram grid | `marcela-tailored-jacket-suit-in-jardin-print-soft-khaki` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/3F40D7F5-2DDE-4241-B8C7-F6234CF3EFD8.jpg |
| `instagram-julieta-skirt.jpg` | Instagram grid | `julieta-skirt-in-embroidery-garden-off-white` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Jazmin_Top_Julieta_skirt_in_embroidery_garden_in_off_white.jpg |
| `product-toledo-top-bordeaux.jpg` | Product page: Complete the Set thumbnail | `toledo-top-in-bordeaux-venezuela-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Toledotopinbordeauxvenezuelaprint.jpg |
| `archive-luciernaga.jpg` | Collection page: Archive band | `luciernaga-dress-in-gold-sequins` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/LuciernagaDressinGoldSequins.jpg |
| `archive-guayaba-canario.jpg` | Collection page: Archive band | `guayaba-mini-dress-in-canario-blue-print` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/GuayabaminidressinCanarioblueprint_a5e812bd-4ee8-489d-a7f2-febd42686769.jpg |
| `logo-white.png` | Header over the homepage banner (existing file) | `—` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Logo_NPLG_white_web.png |
| `logo-dark-grey.png` | Header elsewhere and footer (existing file) | `—` | https://cdn.shopify.com/s/files/1/0326/9361/6775/files/Logo_NPLG_dark_grey_web.png |

---

## 8. Still to confirm with the client

- **Resort copy** and the **Instagram headline** ("From Caracas, with love") are drafts.
- **Fonts:** a real WOFF2 for HV Harietta; whether to license Californian FB Bold for the menu.
- **Header colour:** cream recommended; grass green and bordeaux shown as options.
- **SS26 menu link** currently points to `spring-summer-25`.
- **Orchid graphic:** placeholder line drawing; their design team could supply an orchid from their own print artwork.
- **Matching sets:** which pieces pair; bundle pricing if they want a set price.
- **More product photos** for hero products.
