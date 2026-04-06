import { fetchAPI } from './client';
import type { StrapiSingleResponse, StrapiResponse } from '../model';

/**
 * 通用的 Strapi Content Type 獲取函式
 * 
 * 使用方式：
 * ```typescript
 * // 獲取列表
 * const articles = await fetchContentType('articles', {
 *   locale: 'zh-TW',
 *   populate: { cover: true, author: true },
 *   sort: ['publishedAt:desc'],
 *   pagination: { page: 1, pageSize: 10 }
 * });
 * 
 * // 獲取單筆（使用 spreadData）
 * const article = await fetchContentType('articles', {
 *   filters: { slug: { $eq: 'my-article' } },
 *   populate: { cover: true, blocks: true }
 * }, true);
 * ```
 * 
 * @param contentType Content Type 名稱 (例如 'articles', 'artworks')
 * @param params 查詢參數 (populate, filters, sort, pagination, locale 等)
 * @param spreadData 是否展開 data（用於單筆查詢）
 * @returns Strapi API 回應
 */
export default async function fetchContentType<T = any>(
  contentType: string,
  params: Record<string, unknown> = {},
  spreadData?: boolean
): Promise<T> {
  try {
    // 如果有 filters，則不使用快取（確保過濾結果即時更新）
    const hasFilters = params.filters && Object.keys(params.filters as object).length > 0;
    const cacheConfig = hasFilters
      ? { cache: 'no-store' as const }
      : { next: { revalidate: 60 } };

    const data = await fetchAPI<any>(`/${contentType}`, params, {
      ...cacheConfig,
    });

    // 如果 spreadData = true，展開 data 欄位
    if (spreadData) {
      // 如果是陣列且有資料，回傳第一筆
      if (Array.isArray(data.data) && data.data.length > 0) {
        return data.data[0];
      }
      // 如果是物件，直接回傳
      if (!Array.isArray(data.data)) {
        return data.data;
      }
      // 沒資料回傳 null
      return null as T;
    }
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('FetchContentTypeError', error);
    // 回傳空資料結構
    return (spreadData ? null : { data: [] }) as T;
  }
}

/**
 * 展開 Strapi 回應的輔助函式
 * 用於將 { data: {...} } 結構展開成單一物件
 */
export function spreadStrapiData<T>(response: StrapiResponse<T> | StrapiSingleResponse<T>): T | null {
  if ('data' in response) {
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }
    if (!Array.isArray(response.data)) {
      return response.data;
    }
  }
  return null;
}
