import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";
import { fetchAPI } from './client';
import type { StrapiSingleResponse, StrapiResponse } from '../model';

/**
 * 獲取與當前登入使用者相關的 Strapi Content Type
 * 
 * 這個函式會自動從 session 中取得 JWT token，並將其加入請求 header 中。
 * 用於獲取需要使用者權限的資料，例如 /users/me。
 * 
 * 使用方式：
 * ```typescript
 * // 獲取當前使用者的資料
 * const me = await fetchSelfContent('users/me', {
 *   populate: 'artworks'
 * });
 * ```
 * 
 * @param contentType Content Type 名稱 (例如 'users/me')
 * @param params 查詢參數 (populate, filters, sort, pagination, locale 等)
 * @param spreadData 是否展開 data（用於單筆查詢）
 * @returns Strapi API 回應
 */
export default async function fetchSelfContent<T = any>(
  contentType: string,
  params: Record<string, unknown> = {},
  spreadData?: boolean
): Promise<T> {
  try {
    // 取得認證資訊
    const session = await getServerSession(authOptions);

    // 如果沒有 JWT，視為未登入，回傳空資料
    if (!session?.jwt) {
      console.warn('[fetchSelfContent] 未登入或 JWT 不存在');
      return (spreadData ? null : { data: [] }) as T;
    }

    // 使用 fetchAPI，並覆蓋 Authorization header
    // 注意：使用者資料不應該快取，因為每個使用者的 JWT 不同
    const data = await fetchAPI<any>(`/${contentType}`, params, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      cache: 'no-store', // 使用者資料必須動態獲取，不可快取
    });

    console.log(`[fetchSelfContent] 成功獲取 ${contentType}`);

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

    return data;
  } catch (error) {
    console.error('[fetchSelfContent] 異常:', error);
    // 回傳空資料結構
    return (spreadData ? null : { data: [] }) as T;
  }
}

/**
 * 展開 Strapi 回應的輔助函式 (與 fetchContentType 共用邏輯，但為了獨立性這裡也保留一份或直接引用)
 * 這裡為了方便直接重新導出或定義
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
