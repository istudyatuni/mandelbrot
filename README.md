# Mandelbrot set

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
