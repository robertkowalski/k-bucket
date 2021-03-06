'use strict'
var bufferEquals = require('buffer-equals')
var EventEmitter = require('events').EventEmitter
var test = require('tape')
var KBucket = require('../')

test('localNodeId should be a random SHA-1 if not provided', function (t) {
  var kBucket = new KBucket()
  t.true(kBucket.localNodeId instanceof Buffer)
  t.same(kBucket.localNodeId.length, 20) // SHA-1 is 160 bits (20 bytes)
  t.end()
})

test('localNodeId is a Buffer populated from options if options.localNodeId Buffer is provided', function (t) {
  var localNodeId = new Buffer('some length')
  var kBucket = new KBucket({ localNodeId: localNodeId })
  t.true(kBucket.localNodeId instanceof Buffer)
  t.true(bufferEquals(kBucket.localNodeId, localNodeId))
  t.end()
})

test('throws exception if options.localNodeId is a String', function (t) {
  t.throws(function () {
    return new KBucket({ localNodeId: 'some identifier' })
  })
  t.end()
})

test('check root node', function (t) {
  var kBucket = new KBucket()
  t.same(kBucket.root, { contacts: [], dontSplit: false, left: null, right: null })
  t.end()
})

test('inherits from EventEmitter', function (t) {
  var kBucket = new KBucket()
  t.true(kBucket instanceof EventEmitter)
  t.end()
})
