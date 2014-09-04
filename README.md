set-from-path
=============

JS library to help you set values in nested objects using a string '.'
separated path indicating the different keys to be accessed along the way.

It also exports a get function to get properties with the same notation

Examples
--------

```js
// Defaults to throwing when intermediate paths are not valid
// (non-existent or primitives)

var set = require('set-from-path').set

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

// There is also a get function that works the same way

var get = require('set-from-path').get

var a = { b: 1, c: { d: 2, e: [3, {f: 5}, 2] } };

get('a', a)       //> undefined
get('b', a)       //> 1
get('c.a', a)     //> undefined
get('c.d', a)     //> 2
get('c.e.0', a)   //> 3
get('c.e.1', a)   //> {f:5}
get('c.e.1.f', a) //> 5

```

Usage
-----

```
npm install --save set-from-path
```

Upgrade
-------

### 1.0 to 2.0

All functions are exported from the module as methods. Before, the exports was
the `set` function, but in 2.0 exports is just an object with the
functions on it, so:

Change in your code:

** 1.0 **
```js
var set = require('set-from-path')
```

** 2.0 **
```js
var set = require('set-from-path').set
```

The rest remains the same (`.setp` or `.set`).

`get` was added to 2.0.

