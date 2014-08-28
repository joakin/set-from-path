set-from-path
=============

JS library to help you set values in nested objects using a string '.'
separated path indicating the different keys to be accessed along the way.

Examples
--------

```js
// Defaults to throwing when intermediate paths are not valid
// (non-existent or primitives)

var set = require('set-from-path')

var a = {}
set('b', 1, a)            //> { b: 1 }
set('c', {}, a)           //> { b: 1, c: {} }
set('c.a', 1, a)          //> { b: 1, c: { a: 1 } }
set('c.b', [], a)         //> { b: 1, c: { a: 1, b: [] } }
set('c.b.0', 1, a)        //> { b: 1, c: { a: 1, b: [ 1 ] } }
set('c.b.1', { d: 1 }, a) //> { b: 1, c: { a: 1, b: [ 1, { d: 1 } ] } }
set('c.b.1.d', 2, a)      //> { b: 1, c: { a: 1, b: [ 1, { d: 2 } ] } }

set('b.c', 1, a)          //> Error: Couldn't set b.c in {"b":1,"c":{"a" ...
set('a.c', 1, a)          //> Error: Couldn't set a.c in {"b":1,"c":{"a" ...

// Also exports a setp that creates intermediate non existing paths as objects
// Similar in spirit to mkdir and mkdirp

var setp = require('set-from-path').setp
var b = { b: 1, c: { d: 2 } };
setp('c.d.a', 1, b);    //> { b: 1, c: { d: { a: 1 } } }
var c = { a: { a: 1} };
setp('b.c', 1, c);      //> { a: { a: 1 }, b: { c: 1 } }
setp('a.c.d', 1, c);    //> { a: { a: 1, c: { d: 1 } }, b: { c: 1 } }

// You get the idea...
```

Usage
-----

```
npm install --save set-from-path
```
