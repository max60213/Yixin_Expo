/**
 * Event 型別定義
 */

import type { StrapiImage } from './common';
import type { GalleryListItem } from './gallery';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { STRAPI_IMAGE_QUERY } from './common';
import { ArtistAvatarListItem, ARTIST_AVATAR_LIST_QUERY } from './artistAvatarList';
import fetchContentType from '@/app/lib/strapi/fetchContentType';

// ========== STRAPI EVENT TYPE（完整型別）==========

export interface Event {
  id: number;
  documentId: string;
  title: string;
  about: BlocksContent | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string;
  mapUrl: string | null;
  cover: StrapiImage | null;
  tags?: { name: string }[];
  galleries?: GalleryListItem[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: any[];
}

// ========== LIST ITEM（用於列表頁 EventCard）==========

export interface EventListItem {
  id: number;
  documentId: string;
  title: string;
  publishDate: string;
  cover: StrapiImage | null;
  tags: string[];
  gallery: GalleryListItem[];
}

/**
 * 將 Strapi Event 轉換為 EventListItem（給 EventCard 使用）
 */
export function mapEventListItem(raw: any): EventListItem {
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title,

    // 處理日期：優先使用 startDate
    publishDate: raw.startDate
      ? new Date(raw.startDate).toLocaleDateString()
      : new Date(raw.publishedAt).toLocaleDateString(),

    // 直接傳遞完整的 StrapiImage 物件
    cover: raw.cover || null,

    // 處理 tags（物件陣列 → 字串陣列）
    tags: raw.tags?.map((tag: any) => tag.name || tag) || [],

    // 處理 galleries -> gallery
    gallery: raw.galleries || [],
  };
}

// ========== QUERY CONFIG（定義需要 fetch 的欄位）==========

export const EVENT_LIST_QUERY = {
  fields: ['title', 'startDate', 'endDate', 'location', 'publishedAt'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    tags: { fields: ['name'] },
    galleries: { fields: ['name', 'documentId'] },
  },
  sort: ['startDate:desc'],
};

export const EVENT_DETAIL_QUERY = {
  fields: ['title', 'startDate', 'endDate', 'location', 'publishedAt', 'about'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    tags: { fields: ['name'] },
    galleries: { fields: ['name', 'documentId'] },
    artworks: { count: true },
    artists: { count: true },
  },
};

// ========== DETAIL TYPE（用於詳情頁）==========

export interface EventDetail {
  documentId: string;
  title: string;
  about: BlocksContent | null;
  publishDate: string;
  cover: StrapiImage | null;
  tags: string[];
  galleries: GalleryListItem[];
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  artworkCount: number;
  artistCount: number
}

/**
 * 將 Strapi Event 轉換為 EventDetail（給詳情頁使用）
 */
export function mapEventDetail(raw: any): EventDetail {
  return {
    documentId: raw.documentId,
    title: raw.title,
    about: raw.about || null,

    // 處理日期顯示格式
    publishDate: raw.publishedAt
      ? new Date(raw.publishedAt).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\//g, '.') + ' 發佈'
      : '',

    cover: raw.cover || null,

    // 處理 tags（物件陣列 → 字串陣列，加上 #）
    tags: raw.tags?.map((tag: any) => `#${tag.name || tag}`) || [],

    // 處理 galleries
    galleries: raw.galleries || [],

    startDate: raw.startDate || null,
    endDate: raw.endDate || null,
    location: raw.location || null,
    artworkCount: (raw.artworks as any)?.count || 0,
    artistCount: (raw.artists as any)?.count || 0
  };
}

/**
 * 獲取活動相關的藝術家
 * @param documentId - Event 的 documentId
 */
export async function fetchEventArtists(
  documentId: string
): Promise<ArtistAvatarListItem[] | null> {
  const query = {
    ...ARTIST_AVATAR_LIST_QUERY,
    filters: {
      ...ARTIST_AVATAR_LIST_QUERY.filters,
      events: {
        documentId: {
          $eq: documentId,
        },
      },
    },
  };

  const response = await fetchContentType<{ data: ArtistAvatarListItem[] }>(
    'artist-list',
    query
  );

  return response?.data || null;
}