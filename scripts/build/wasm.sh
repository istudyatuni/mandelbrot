#!/bin/bash

cd wasm

build () {
	wasm-pack build --release --out-dir=../src/wasm
}

build || export PATH=$PATH:$HOME/.cargo/bin && build
