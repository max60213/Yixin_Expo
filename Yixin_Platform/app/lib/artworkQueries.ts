/**
 * Artwork 相關的 Strapi 查詢配置
 *
 * 根據 Strapi v5 官方文件：
 * - 不使用 fields 參數，讓 Strapi 返回所有基本欄位
 * - 使用 populate 明確指定要載入的 relations 和 media
 * - 在 populate 內部使用 fields 來限制關聯資料的欄位
 *
 * 參考：https://docs.strapi.io/cms/api/rest/populate-select
 */

/**
 * ArtworkCard 所需的查詢配置
 * 用於卡片顯示：封面圖、標題、藝術家、年份
 */
// ========== QUERY CONFIG（定義需要 fetch 的欄位）==========



/**
 * Artwork 完整詳情查詢配置
 * 用於詳情頁面，包含所有關聯資料
 */


