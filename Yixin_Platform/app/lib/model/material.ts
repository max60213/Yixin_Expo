/**
 * Material 型別定義
 * 
 * API Endpoint: /material-list
 */

import { StrapiImage } from "./common";

/**
 * MaterialListItem - 從 /material-list API 返回的資料結構
 */
export interface MaterialListItem {
  documentId: string;
  name: string;
  count: number;
  scannedImage?: StrapiImage | null;
}

/**
 * /material-list API 的響應格式
 */
export interface MaterialListResponse {
  data: MaterialListItem[];
}

// ========== ARTWORK BY MATERIAL QUERY ==========

import { ArtworkListItem, mapArtworkListItem, ARTWORK_LIST_QUERY } from './artwork';

/**
 * 建構查詢特定 Material 的 Artworks Query
 * 基於 ARTWORK_LIST_QUERY，加入 Material 篩選條件
 * 
 * @param materialDocumentId - Material 的 documentId
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁數量（預設 20）
 */
export function getArtworksByMaterialQuery(
  materialDocumentId: string,
  page: number = 1,
  pageSize: number = 20
) {
  return {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      materials: {
        documentId: {
          $eq: materialDocumentId,
        },
      },
    },
    pagination: {
      page,
      pageSize,
    },
  };
}

/**
 * 用於 Material 詳情頁的 Artwork 回應型別
 */
export interface ArtworksByMaterialResponse {
  data: ArtworkListItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Re-export for convenience
export type { ArtworkListItem };
export { mapArtworkListItem };