# Link Me

Preview URLs before visiting them.

Features:

- Mitigates homograph attacks:
  - Uses the browser's URL parser
  - Uses the Atkinson Hyperlegible font for URLs
- Dark theme
- Better error handling

## Security

The browser's URL parser automatically converts the origin into lowercase to avoid lookalike characters (e.g. `lI1`, `O0`, ...).

| Before                                     | After                                     |
| ------------------------------------------ | ----------------------------------------- |
| ![Before](https://i.imgur.com/uWgBAqM.png) | ![After](https://i.imgur.com/CG2SDue.png) |

The browser's URL parser automatically converts the origin into [Punycode](https://en.wikipedia.org/wiki/Punycode) to avoid internationalized domain names using [homoglyphs](https://en.wikipedia.org/wiki/Homoglyph).

| Before                                     | After                                     |
| ------------------------------------------ | ----------------------------------------- |
| ![Before](https://i.imgur.com/795Fwj4.png) | ![After](https://i.imgur.com/ZXBuiFv.png) |

## Install

```sh
npm install
```

## Development

```sh
npm run start
```

## Build

```sh
npm run build
```

## Lint

```sh
npm run lint
```
