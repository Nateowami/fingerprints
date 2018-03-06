#! /bin/bash

PATH="$PWD/node_modules/.bin:$PATH"

set -x

build () {
  pugjs
  sass
  js
}

serve () {
  watch &
  browser-sync start --server --files "*.js,*.css,*.html" &
  wait
}

watch () {
  sass # does not do initial build on watch

  sass --watch &
  js --watch &
  pugjs --watch &
  wait
}

sass () {
  node-sass ${1:-} --output . style.scss
}

js () {
  babel ${1:-} --presets es2015 --out-file script.js script.es6
}

pugjs () {
  pug ${1:-} index.pug
}
