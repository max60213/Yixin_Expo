/**
 * Artist 型別定義和 Fetchers
 */

import type { StrapiImage } from './common';
import { STRAPI_IMAGE_QUERY } from './common';
import { ARTWORK_LIST_QUERY, ArtworkListItem, mapArtworkListItem, type Artwork } from './artwork';
import { EVENT_LIST_QUERY, EventListItem, mapEventListItem, type Event } from './event';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import { strapiImage } from '@/app/lib/strapi/strapiImage';
import type { ProfileData } from '@/app/templates/ProfilePage';

export interface Artist {
  id: number;
  documentId: string;
  name: string;
  cover: StrapiImage | null;
  avatar: StrapiImage | null;
  about: any | null;
  countryRegion: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: any[];
}

export interface ArtistListItem {
  name: string;
  documentId: string;
}

export const mapArtistListItem = (raw: any): ArtistListItem => {
  return {
    documentId: raw.documentId,
    name: raw.name,
  };
};

// ========== QUERY CONFIG ==========

/**
 * 藝術家列表查詢（用於 ArtistCard）
 */
export const ARTIST_LIST_QUERY = {
  fields: ['name', 'documentId'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    avatar: STRAPI_IMAGE_QUERY,
  },
};

/**
 * 藝術家詳情查詢（用於 Profile 頁面）
 */
export const ARTIST_DETAIL_QUERY = {
  fields: ['name', 'about', 'countryRegion'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    avatar: STRAPI_IMAGE_QUERY,
    artworks: ARTWORK_LIST_QUERY,
    events: EVENT_LIST_QUERY,
  },
};

// ========== ARTIST ARTWORKS QUERY ==========

/**
 * 產生查詢特定藝術家所有作品的 Query
 * 從 artworks 篩選出 artists 包含指定 documentId 的項目
 * 
 * @param artistDocumentId 藝術家的 documentId
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁數量（預設 20）
 * @returns Strapi query 物件
 */
export const getArtistArtworksQuery = (
  artistDocumentId: string,
  page: number = 1,
  pageSize: number = 20
) => ({
  ...ARTWORK_LIST_QUERY,
  filters: {
    ...ARTWORK_LIST_QUERY.filters,
    artists: {
      documentId: {
        $eq: artistDocumentId,
      },
    },
  },
  pagination: {
    page,
    pageSize,
  },
});

/**
 * 藝術家作品列表的回應介面
 */
export interface ArtistArtworksResponse {
  artistDocumentId: string;
  artworks: ArtworkListItem[];
}

/**
 * 將 Strapi 回應轉換為 ArtistArtworksResponse
 */
export const mapArtistArtworks = (
  artistDocumentId: string,
  rawArtworks: any[]
): ArtistArtworksResponse => ({
  artistDocumentId,
  artworks: rawArtworks.map(mapArtworkListItem),
});

// ========== FETCHERS ==========

/**
 * 獲取藝術家基本資料 (Header 用)
 * 只取得名稱和作品/活動數量，減少資料傳輸
 */
export async function fetchArtistProfile(
  slug: string
): Promise<{ profile: ProfileData } | null> {
  const response = await fetchContentType<{
    data: Artist & {
      artworks?: { count: number };
      events?: { count: number }
    }
  }>(
    `artists/${slug}`,
    {
      populate: {
        avatar: STRAPI_IMAGE_QUERY,
        artworks: { count: true },
        events: { count: true },
      },
      fields: ['documentId', 'name', 'countryRegion', 'about'],
    }
  );

  const artist = response?.data;
  if (!artist) {
    return null;
  }

  const artworksCount = (artist.artworks as any)?.count || 0;
  const eventsCount = (artist.events as any)?.count || 0;

  const profile: ProfileData = {
    // 暫時不顯示封面圖，因為簡化 API 不包含圖片
    coverImage: undefined,
    name: artist.name,
    country: artist.countryRegion || undefined,
    region: '',
    // 使用真實頭像或 undefined（由 ProfilePage 處理 fallback）
    avatar: artist.avatar?.url ? strapiImage(artist.avatar.url) : undefined,
    stats: [
      { number: artworksCount, label: '作品' },
      { number: eventsCount, label: '場活動' },
    ],
    about: artist.about || [],
  };

  return { profile };
}

/**
 * 獲取藝術家的作品
 */
export async function fetchArtistArtworks(
  slug: string
): Promise<ArtworkListItem[] | null> {
  const response = await fetchContentType<{ data: Artist }>(
    `artists/${slug}`,
    {
      fields: ['documentId'],
      populate: {
        artworks: {
          populate: ARTWORK_LIST_QUERY.populate,
          fields: ARTWORK_LIST_QUERY.fields,
        },
      },
    }
  );

  const artist = response?.data;
  const artworks = (artist as any)?.artworks as Artwork[];

  if (!artworks || artworks.length === 0) {
    return null;
  }

  return artworks.map(mapArtworkListItem);
}

/**
 * 獲取藝術家參與的活動
 */
export async function fetchArtistEvents(
  slug: string
): Promise<EventListItem[] | null> {
  const response = await fetchContentType<{ data: Artist }>(
    `artists/${slug}`,
    {
      populate: {
        events: {
          populate: EVENT_LIST_QUERY.populate,
          fields: EVENT_LIST_QUERY.fields,
        },
      },
    }
  );

  const artist = response?.data;
  const events = (artist as any)?.events as Event[];

  if (!events || events.length === 0) {
    return null;
  }

  return events.map(mapEventListItem);
}

