# Mandelbrot set

The [`v1` tag][v1-tag] marks a commit with a performance fix I deployed 4 hours before my coursework defense.

[v1-tag]: https://github.com/istudyatuni/mandelbrot/commit/5c0cd1eba2b8652fdf623fcaf396639f9caaf79d

## Try online

https://istudyatuni.github.io/mandelbrot

## Build WASM

You need rust and cargo for installing build tool, see [rustup](https://rustup.rs). Install `wasm-pack`:

```bash
cargo install wasm-pack
```

Build:

```bash
./scripts/build-wasm.sh
# or
yarn build:wasm
# version with debug logging enabled
yarn build:wasm:debug
```

## Running locally

```bash
yarn dev
```
