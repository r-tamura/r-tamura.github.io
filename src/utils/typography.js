import Typography from 'typography'
import sutroTheme from 'typography-theme-sutro'

// ベースはsutroテーマ
// 基本フォントサイズのみ 18px -> 16pxに変更
sutroTheme.baseFontSize = "16px"

const typography = new Typography(sutroTheme)

module.exports = typography
