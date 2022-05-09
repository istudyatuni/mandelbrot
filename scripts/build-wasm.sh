#!/bin/bash

if [[ $CI ]]; then
	export PATH=$PATH:$HOME/.cargo/bin
fi

cd wasm
wasm-pack --log-level warn build --release --out-dir=../src/wasm
