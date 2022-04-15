#!/bin/bash

cd wasm
wasm-pack build --release --out-dir=../src/wasm
