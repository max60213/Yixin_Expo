/**
 * 全域斷點配置
 * 
 * 統一管理所有響應式斷點，確保整個應用的一致性
 * 可用於：
 * - useBreakpoints hook (Media Query)
 * - react-masonry-css (Masonry 佈局)
 * - CSS breakpoints (@media queries)
 */

export const BREAKPOINTS = {
  sm: 500,   // 小型裝置 (手機)
  md: 800,   // 中型裝置 (平板直向)
  lg: 1100,  // 大型裝置 (平板橫向、小筆電)
  xl: 1400,  // 超大型裝置 (桌機)
  '2xl': 1800, // 超超大型裝置 (大螢幕)
} as const;


/**
 * 取得 min-width media query 字串
 */
export const getMinWidthQuery = (minWidth: number) => `(min-width: ${minWidth}px)`;

/**
 * 取得 max-width media query 字串
 */
export const getMaxWidthQuery = (maxWidth: number) => `(max-width: ${maxWidth - 1}px)`;
