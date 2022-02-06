#!/bin/bash

# optimization
O='-O3'

PARAMS="$O mandelbrot.cpp -o mandelbrot.js
-s NO_EXIT_RUNTIME=1
-s EXPORTED_RUNTIME_METHODS=ccall,cwrap,getValue
-s EXPORTED_FUNCTIONS=_calcPlane,_malloc,_free
-s ALLOW_MEMORY_GROWTH=1
-s EXPORT_ES6=1
-s MODULARIZE=1
-s ENVIRONMENT=web
$@"

cd src/wasm

if [[ $GITHUB_ACTIONS == true ]]; then
	em++ $PARAMS
else
	docker run --rm -v "$(pwd):/src" -u "$(id -u):$(id -g)" emscripten/emsdk em++ $PARAMS
fi

# options EXPORT_ES6, MODULARIZE, EXPORTED_RUNTIME_METHODS from https://stackoverflow.com/q/53309095
