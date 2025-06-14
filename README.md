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

## Precision problem

At around 45x zoom artifacts start to appear, because double-precision floats, `f64`, are not sufficiently accurate. This can be fixed by using arbitrary-precision arithmetic library. I tried it, and it has very poor performance - see benchmarks below. You can try it on [test/high-precision][high-precision-compare] branch with:

[high-precision-compare]: https://github.com/istudyatuni/mandelbrot/compare/master...test/high-precision

```sh
cd wasm
cargo bench
```

<details>
<summary>Benchmarks</summary>

With `f64`, 1600x752, 256 steps:

```
calc fully black        time:   [719.05 ms 720.09 ms 721.23 ms]
Found 9 outliers among 100 measurements (9.00%)
  3 (3.00%) high mild
  6 (6.00%) high severe

calc main view          time:   [4.6180 ms 4.6422 ms 4.6705 ms]
Found 15 outliers among 100 measurements (15.00%)
  7 (7.00%) high mild
  8 (8.00%) high severe
```

With arbitrary-precision library, 1x2, 18 steps:

```
looooong/calc fully black time:   [23.873 s 23.885 s 23.899 s]

looooong/calc main view   time:   [1.2665 µs 1.2677 µs 1.2690 µs]
```

With arbitrary-precision library, 1x2, 20 steps:

```
looooong/calc fully black time:   [139.85 s 139.86 s 139.87 s]
Found 1 outliers among 10 measurements (10.00%)
  1 (10.00%) high mild
```

With arbitrary-precision library, 10x20, 20 steps:

```
looooong/calc main view time:   [143.26 µs 143.35 µs 143.50 µs]
```

</details>
