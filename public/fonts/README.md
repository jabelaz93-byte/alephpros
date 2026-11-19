# Logo font: Mayak (ParaType)

The AlephPros brand name is always set in **Mayak**. Four weights are self-hosted here as
woff2 (converted from the licensed .ttf files):

| File | Weight |
| --- | --- |
| `Mayak-Light.woff2` | 300 |
| `Mayak-Regular.woff2` | 400 |
| `Mayak-Medium.woff2` | 500 |
| `Mayak-Bold.woff2` | 700 |

Where it's used (`app/globals.css`):

- `--logo-weight` (now 700, Bold): the header/menu logo and the footer wordmark.
- `--brand-weight` (now 500, Medium): "AlephPros" inside headings and text, wrapped
  automatically by `components/ui/BrandText.tsx`.

To try another weight, change those two values. If the logo weight changes, also update
`LOGO_FONT` in `app/layout.tsx` (the file preloaded on every page).

Licence: ParaType web licence (see the font's licence URL). Only serve these files from the
AlephPros website; don't share them in a public repository.
