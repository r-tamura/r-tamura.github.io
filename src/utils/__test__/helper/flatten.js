import test from 'ava'
import { flatten } from '../../helper'

test('flatten', t => {
  t.deepEqual(flatten([1, [2]]), [1, 2])
})

test('flatten 2', t => {
  t.deepEqual(flatten([1, [2, 3]]), [1, 2, 3])
})

test('flatten 3', t => {
  t.deepEqual(flatten([1, [2, [3]]]), [1, 2, [3]])
})

test('flatten 4', t => {
  t.deepEqual(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4])
})
