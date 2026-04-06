/**
 * Strapi API 統一入口
 * 
 * 提供讀取和寫入 Strapi Content Type 的完整功能
 */

// ========== 讀取操作 (GET) ==========
export { default as fetchContentType, spreadStrapiData } from './fetchContentType';

// ========== 寫入操作 (POST/PUT/DELETE) ==========
export { mutateContentType, updateUserRelation } from './mutateContentType';
export type { MutateResult } from './mutateContentType';

// ========== 客戶端工具 ==========
export { fetchAPI, getStrapiURL, getUndiciAgent, STRAPI_API_URL } from './client';

/**
 * 使用範例：
 * 
 * ```typescript
 * // 讀取資料
 * import { fetchContentType } from '@/app/lib/strapi';
 * const artworks = await fetchContentType('artworks', { 
 *   populate: '*',
 *   pagination: { pageSize: 10 }
 * });
 * 
 * // 寫入資料（Server Action 中）
 * import { mutateContentType } from '@/app/lib/strapi';
 * const result = await mutateContentType('artworks', {
 *   method: 'POST',
 *   data: { title: '新作品' }
 * });
 * 
 * // 更新使用者收藏
 * import { updateUserRelation } from '@/app/lib/strapi';
 * await updateUserRelation('artworks', 'connect', ['abc123']);
 * ```
 */
