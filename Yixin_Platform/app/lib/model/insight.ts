/**
 * Insight 型別定義
 */

import type { StrapiImage } from './common';
import type { GalleryListItem } from './gallery';
import type { ArtistListItem } from './artist';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { STRAPI_IMAGE_QUERY } from './common';

// ========== STRAPI INSIGHT TYPE（完整型別）==========

export interface Insight {
  id: number;
  documentId: string;
  title: string;
  content: BlocksContent | null;
  cover: StrapiImage | null;
  galleries?: GalleryListItem[];
  artists?: ArtistListItem[];
  artworks?: any[];
  series?: any[];
  collectedBy?: any[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: any[];
}

// ========== LIST ITEM（用於列表頁 InsightCard）==========

export interface InsightListItem {
  id: number;
  documentId: string;
  title: string;
  publishDate: string;
  cover: StrapiImage | null;
  galleries: GalleryListItem[];
}

/**
 * 將 Strapi Insight 轉換為 InsightListItem（給 InsightCard 使用）
 */
export function mapInsightListItem(raw: any): InsightListItem {
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title,

    // 處理日期：使用 publishedAt
    publishDate: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString('zh-TW')
      : '',

    // 直接傳遞完整的 StrapiImage 物件
    cover: raw.cover || null,

    // 處理 galleries
    galleries: raw.galleries || [],
  };
}

// ========== QUERY CONFIG（定義需要 fetch 的欄位）==========

export const INSIGHT_LIST_QUERY = {
  fields: ['title', 'publishedAt'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    galleries: { fields: ['name', 'documentId'] },
  },
  sort: ['publishedAt:desc'],
};

export const INSIGHT_DETAIL_QUERY = {
  fields: ['title', 'content', 'publishedAt'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    galleries: { fields: ['name', 'documentId'] },
    artists: { fields: ['name', 'documentId'] },
    artworks: { fields: ['title', 'documentId'] },
  },
};

// ========== DETAIL TYPE（用於詳情頁）==========

export interface InsightDetail {
  documentId: string;
  title: string;
  content: BlocksContent | null;
  publishDate: string;
  cover: StrapiImage | null;
  galleries: GalleryListItem[];
  artists: ArtistListItem[];
  artistCount: number;
  artworkCount: number;
}

/**
 * 將 Strapi Insight 轉換為 InsightDetail（給詳情頁使用）
 */
export function mapInsightDetail(raw: any): InsightDetail {
  return {
    documentId: raw.documentId,
    title: raw.title,
    content: raw.content || null,

    // 處理日期顯示格式
    publishDate: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.') + ' 發佈'
      : '',

    cover: raw.cover || null,

    // 處理關聯資料
    galleries: raw.galleries || [],
    artists: raw.artists || [],
    
    // 計數
    artistCount: raw.artists?.length || 0,
    artworkCount: raw.artworks?.length || 0,
  };
}

/**
 * 獲取與 insight 相關的藝術家列表
 */
export async function fetchInsightArtists(
  documentId: string
): Promise<import('./artistAvatarList').ArtistAvatarListItem[]> {
  const fetchContentType = (await import('@/app/lib/strapi/fetchContentType')).default;
  const { ARTIST_AVATAR_LIST_QUERY } = await import('./artistAvatarList');

  const query = {
    ...ARTIST_AVATAR_LIST_QUERY,
    filters: {
      ...ARTIST_AVATAR_LIST_QUERY.filters,
      insights: {
        documentId: {
          $eq: documentId,
        },
      },
    },
  };

  const response = await fetchContentType<{ data: import('./artistAvatarList').ArtistAvatarListItem[] }>('artist-list', query);
  return response.data || [];
}
