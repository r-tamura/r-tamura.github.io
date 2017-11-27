import test from 'ava'
import { kebabCase } from '../../helper'

test('One word', t => {
  t.is(kebabCase('Foo'), 'foo')
})

test('Acronym', t => {
  t.is(kebabCase('HTML'), 'html')
})

test('Space separated to Kebab', t => {
  t.is(kebabCase('foo bar'), 'foo-bar')
})

test('Camel to Kebab', t => {
  t.is(kebabCase('FooBar'), 'foo-bar')
  t.is(kebabCase('fooBar'), 'foo-bar')
})

test('Snake to Kebab', t => {
  t.is(kebabCase('foo_bar'), 'foo-bar')
  t.is(kebabCase('__foo_bar__'), 'foo-bar')
})
