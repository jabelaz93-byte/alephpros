# Logo font

The AlephPros logo is set in **Mayak Bold** (ParaType). It is a paid font: use files from
the licence you bought, with web-font rights (ParaType / MyFonts / Fontspring "Web" licence).

Put the file here with exactly this name:

- `Mayak-Bold.woff2`  (preferred; the web-font package includes it)
- or `Mayak-Bold.otf`

`app/globals.css` already loads it (`@font-face { font-family: "Mayak" … }`), and the logo,
the footer wordmark and the carousel's code plates use it through the `font-logo` class.
No code change is needed after adding the file; restart `pnpm dev`.
