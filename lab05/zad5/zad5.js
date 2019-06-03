/* jshint strict: global, esversion: 6, devel: true */
'use strict';

function fib(arg) {
  if (arg === 1) {
    return 1;
  }
  if (arg <= 0) {
     return 0;
  }
   return fib(arg - 1) + fib(arg - 2);
}

function fibMemoized(arg, cache) {
  if (!cache) {
    cache = [0, 1];
  }
  if (arg < cache.length) {
    return cache[arg];
  }
  else {
    let result = fibMemoized(arg-1, cache) + fibMemoized(arg-2, cache);
    cache[arg] = result;
    return result;
  }
}

console.log(fib(7));
console.log(fibMemoized(7));