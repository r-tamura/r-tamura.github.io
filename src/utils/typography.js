import Typography from "typography";
import sutroTheme from "typography-theme-sutro";

// ベースはsutroテーマ
export default new Typography({
  ...sutroTheme,
  // 基本フォントサイズのみ 18px -> 16pxに変更
  baseFontSize: "16px",
});
