/**
 * ArtistList 型別定義
 * 
 * API Endpoint: /artist-list
 */

import type { StrapiImage } from "./common";

// ========== API RESPONSE TYPES ==========

/**
 * ArtistListItem - 從 /artist-list API 返回的資料結構
 */
export interface ArtistAvatarListItem {
  documentId: string;
  name: string;
  count: number;
  /** 優先使用 avatar，若無則使用其第一張 artwork 的 scannedImage */
  finalAvatar: StrapiImage | null;
}

/**
 * /artist-list API 的響應格式
 */
export interface ArtistListResponse {
  data: ArtistAvatarListItem[];
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}

// ========== QUERY CONFIG ==========

export const ARTIST_AVATAR_LIST_QUERY = {
  pagination: {
    limit: 20,
  },
  filters: {
    publishedAt: {
      $notNull: true
    }
  }
};