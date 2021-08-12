/**
 * 配列を１段階平坦化する
 * @param {array} xs
 * @return array 平坦化された配列
 */
function flatten(xs) {
  return [].concat(...xs)
}
exports.flatten = flatten

/**
 * 文字列をwordごとの配列へ分割する
 * @param {string} str
 * @return {array} 分割されたWord毎の配列
 * @example
 *
 * kebabCase('FooBar')   // => [Foo, Bar]
 * kebabCase('foo bar')  // => [foo, bar]
 * kebabCase('foo_bar')  // => [foo, bar]
 */
function words(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^[_]+/, '')
    .replace(/[_]+$/, '')
    .replace('_', ' ')
    .trim()
    .split(' ')
}
exports.words = words

/**
 * 文字列をKebab Caseへ変換する
 * @param {string} str
 * @return {string} KebabCase文字列
 * @example
 *
 * kebabCase('FooBar')   // => 'foo-bar'
 * kebabCase('foo bar')  // => 'foo-bar'
 * kebabCase('foo_bar')  // => 'foo-bar'
 */
function kebabCase(str) {
  console.assert(typeof str === "string");
  return words(str.replace(/['\u2019]/g, '')).join('-').toLowerCase()
}
exports.kebabCase = kebabCase
