# Input Color Card

A minimal Lovelace card for Home Assistant that pairs with the [`input_color`](https://github.com/kkilchrist/ha-color-ext) helper integration. Shows the entity's current color as a tappable swatch and lets you pick either a chromatic color (via the browser color picker) or a white-balance color temperature in kelvin.

This is the **v1** scope: swatch + color picker + Color/White toggle + kelvin slider. Brightness control, multi-light apply, and an in-UI editor card are not included yet.

## Requirements

- Home Assistant 2024.5.0 or newer
- The companion integration installed and at least one `input_color.*` entity: <https://github.com/kkilchrist/ha-color-ext>

## Install

### HACS (custom repository)

1. In HACS go to **Frontend** → menu → **Custom repositories**.
2. Add `https://github.com/kkilchrist/ha-color-ext-card` with category **Lovelace**.
3. Install "Input Color Card".
4. HACS will add the resource automatically. If not, see manual step 3 below.

### Manual

1. Download `dist/input-color-card.js` from the [latest release](https://github.com/kkilchrist/ha-color-ext-card/releases) (or from the `dist/` folder of `main`).
2. Copy it to your Home Assistant `config/www/` directory.
3. Add the resource (Settings → Dashboards → menu → Resources):

   ```yaml
   url: /local/input-color-card.js
   type: module
   ```

4. Reload your browser.

## Usage

Add a card with this YAML:

```yaml
type: custom:input-color-card
entity: input_color.couch_color
```

Optional:

```yaml
type: custom:input-color-card
entity: input_color.couch_color
name: Couch
```

### What you get

- **Color mode** — tap the swatch to open your browser's color picker. The picked hex value is sent to `input_color.set_color` as `hex_value`. Service calls are debounced (~150ms) so dragging is smooth.
- **White mode** — toggle "White" to hide the picker and reveal a kelvin slider (2000–6500 K, step 100). The slider commits via `color_temp_kelvin`.

Switching modes immediately commits the new mode using whichever value is currently shown (so you don't have to also touch the picker/slider to make it stick).

## Build artifact

The committed `dist/input-color-card.js` in this repo is the production build (terser-minified, with an external sourcemap). It's what gets attached to GitHub releases. If you're hacking on the card, run `npm install && npm run dev` to rebuild on save with an inline sourcemap.

## Development

```bash
npm install
npm run lint     # tsc --noEmit
npm run build    # rollup -c (dev build, inline sourcemap)
npm run dev      # rollup -c --watch
RELEASE=true npm run build   # minified release build
```

The card is one file: `src/input-color-card.ts`. Types are local in `src/types.ts` (no `custom-card-helpers` dependency).

## Limitations / roadmap

- v1 only ships color + kelvin. Brightness, "apply to lights" targeting, and a YAML-free editor card will land in later versions.
- The picker is the browser's native `<input type="color">`, not HA's `ha-color-picker` web component. Native is universally available and good enough for v1; an upgrade to `ha-color-picker` with HSV controls is on the table.
- No theming knobs beyond honoring HA's CSS variables (`--primary-color`, `--primary-text-color`, etc.).

## License

Apache-2.0. See [LICENSE](./LICENSE).
