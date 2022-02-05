#!/bin/bash

# optimization
O='-O3'

cd src/wasm

docker run --rm -v "$(pwd):/src" -u "$(id -u):$(id -g)" emscripten/emsdk \
em++ $O mandelbrot.cpp -o mandelbrot.js \
	-s NO_EXIT_RUNTIME=1 \
	-s EXPORTED_RUNTIME_METHODS=ccall,cwrap \
	-s EXPORTED_FUNCTIONS=_checkSeries \
	-s EXPORT_ES6=1 \
	-s MODULARIZE=1 \
	$@

# options EXPORT_ES6, MODULARIZE, EXPORTED_RUNTIME_METHODS from https://stackoverflow.com/q/53309095
