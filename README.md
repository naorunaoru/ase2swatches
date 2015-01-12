# Adobe ASE to Procreate Swatches converter

A simple script to make one from another built with Node. There's a bug — not sure who is guilty — when palettes with multiple parts (30+ colors) suddenly crash Procreate. Also there's no UNIX stream capability, I'll add it if it's really needed.

## Usage

It isn't on npm yet, but you can clone it, do a `npm install -g` and try `ase2swatches` with some files as an argument. That should work.

## Ingredients
* [hughsk/adobe-swatch-exchange](https://github.com/hughsk/adobe-swatch-exchange) for reading ASE
* [One-com/one-color](https://github.com/One-com/one-color) for color manipulation
* [cthackers/adm-zip](https://github.com/cthackers/adm-zip) for zip packing

## License

Licensed under WTFPL. Do whatever you want. Additional components are included with their respective licenses.
