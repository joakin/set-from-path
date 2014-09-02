
var test = require('tape');

var set = require('../index').set;
var setp = require('../index').setp;
var get = require('../index').get;

test('exports set, and also as "setp" method of module', function(t) {
  t.equal(typeof set, 'function');
  t.equal(typeof setp, 'function');
  t.end();
})

test('set returns the passed in obj', function(t) {
  var a = {};
  t.equal(set('a', 1, a), a);
  t.end();
})

test('sets root level path', function(t) {
  var a = {};
  t.equal(set('a', 1, a).a, 1);
  t.end();
})

test('sets inner levels path', function(t) {
  var a = { b: 1, c: { d: 2 } };
  t.equal(set('c.d', 1, a).c.d, 1);
  t.end();
})

test('can\'t set property in primitive type', function(t) {
  var a = { b: 1, c: { d: 2 } };
  t.throws(function() {
    set('c.d.a', 1, a);
  });
  t.end();
})

test('should throw if any part of the key does not exist', function(t) {
  var a = { a: { a: 1} };
  t.throws(function() {
    set('b.c', 1, a);
  });
  t.throws(function() {
    set('a.c.d', 1, a);
  });
  t.end();
})

test('using setp, it creates intermediate objects when before it threw', function(t) {
	var a = { b: 1, c: { d: 2 } };
	t.equal(setp('c.d.a', 1, a).c.d.a, 1);
	var b = { a: { a: 1} };
	t.equal(setp('b.c', 1, b).b.c, 1);
	t.equal(setp('a.c.d', 1, b).a.c.d, 1);
	t.end();
})

test('can set in arrays', function(t) {
  var a = set('0', 1, []);
  t.equal(a.length, 1);
  t.equal(a[0], 1);

  var b = set('a.b.1.c', 1, { a: { b: [{},{},{}] } });
  t.equal(b.a.b[1].c, 1);
  t.end();
})

test('exports a get function', function(t) {
  t.equal(typeof get, 'function');
  t.end();
})

test('can get keys', function(t) {
  var a = { b: 1, c: { d: 2, e: [3, {f: 5}, 2] } };
  t.equal(get('a', a), undefined);
  t.equal(get('b', a), 1);
  t.equal(get('c.a', a), undefined);
  t.equal(get('c.d', a), 2);
  t.equal(get('c.e.0', a), 3);
  t.deepEqual(get('c.e.1', a), {f:5});
  t.equal(get('c.e.1.f', a), 5);
  t.end();
})

