/**
 * Gallery 型別定義
 * 
 * 根據 Strapi API 實際返回格式定義
 * about 欄位使用 Strapi Rich Text Block Editor 格式
 * @see https://strapi.io/blog/integrating-strapi-s-new-rich-text-block-editor-with-next-js-a-step-by-step-guide
 */
import { Artwork, ARTWORK_LIST_QUERY, ArtworkListItem, mapArtworkListItem } from './artwork';
import { STRAPI_IMAGE_QUERY } from './common';
import { StrapiImage } from './common';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { Artist, ARTIST_LIST_QUERY } from './artist';
import { Event, EVENT_LIST_QUERY, EventListItem, mapEventListItem } from './event';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import type { ProfileData } from '@/app/templates/ProfilePage';
import { ArtistAvatarListItem, ARTIST_AVATAR_LIST_QUERY } from './artistAvatarList';

export interface Gallery {
  id: number;
  documentId: string;
  name: string;
  avatar: StrapiImage | null;
  // about 是 Strapi Rich Text Block Editor 格式
  about: BlocksContent | null;
  // 營業資訊
  openTime: string | null;
  closeTime: string | null;
  phone: string | null;
  email: string | null;
  // 時間戳
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  // 關聯資料（注意：Gallery 沒有 logo，只有 cover）
  cover: StrapiImage | null;
  artworks: Artwork[] | null;
  artists: Artist[] | null;
  events: Event[] | null;
  series: any[] | null;
  links: any[] | null;
  member: any[] | null;
  insights: any[] | null;
  localizations: any[];
}

export interface GalleryListItem {
  id: number;
  documentId: string;
  name: string;
  avatar: StrapiImage | null;
}

export const mapGalleryListItem = (raw: GalleryListItem): GalleryListItem => ({
  id: raw.id,
  documentId: raw.documentId,
  name: raw.name,
  avatar: raw.avatar,
});

// ========== QUERY CONFIG ==========

/**
 * 畫廊列表查詢（用於 GalleryCard）
 */
export const GALLERY_LIST_QUERY = {
  fields: ['name', 'documentId'],
  populate: {
    avatar: STRAPI_IMAGE_QUERY,
  },
};

/**
 * 畫廊 Profile 查詢（用於 Profile Header）
 */
export const GALLERY_PROFILE_QUERY = {
  fields: ['documentId', 'name', 'about'],
  populate: {
    cover: STRAPI_IMAGE_QUERY,
    avatar: STRAPI_IMAGE_QUERY,
    artworks: { count: true },
    events: { count: true },
  },
};

// ========== GALLERY SUB-PAGE QUERIES ==========

/**
 * 產生查詢特定畫廊所有作品的 Query
 * 從 artworks 篩選出 ownedByGallery 為指定 documentId 的項目
 * 
 * @param galleryDocumentId 畫廊的 documentId
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁數量（預設 20）
 * @returns Strapi query 物件
 */
export const getGalleryArtworksQuery = (
  galleryDocumentId: string,
  page: number = 1,
  pageSize: number = 20
) => ({
  ...ARTWORK_LIST_QUERY,
  filters: {
    ...ARTWORK_LIST_QUERY.filters,
    ownedByGallery: {
      documentId: {
        $eq: galleryDocumentId,
      },
    },
  },
  pagination: {
    page,
    pageSize,
  },
});

/**
 * 產生查詢特定畫廊所有活動的 Query
 * 從 events 篩選出 gallery 為指定 documentId 的項目
 * 
 * @param galleryDocumentId 畫廊的 documentId
 * @param page - 頁碼（預設 1）
 * @param pageSize - 每頁數量（預設 20）
 * @returns Strapi query 物件
 */
export const getGalleryEventsQuery = (
  galleryDocumentId: string,
  page: number = 1,
  pageSize: number = 20
) => ({
  ...EVENT_LIST_QUERY,
  filters: {
    gallery: {
      documentId: {
        $eq: galleryDocumentId,
      },
    },
  },
  pagination: {
    page,
    pageSize,
  },
});

/**
 * 畫廊藝術家列表查詢
 * 用於顯示畫廊合作的藝術家
 */
export const GALLERY_ARTISTS_QUERY = {
  fields: ['name', 'documentId', 'countryRegion'],
  populate: {
    avatar: STRAPI_IMAGE_QUERY,
  },
};

// ========== FETCHERS ==========

/**
 * 獲取畫廊基本資料 (Header 用)
 */
export async function fetchGalleryProfile(
  slug: string
): Promise<{ profile: ProfileData } | null> {
  const response = await fetchContentType<{
    data: Gallery & {
      artworks?: { count: number };
      events?: { count: number }
    }
  }>(
    `galleries/${slug}`,
    GALLERY_PROFILE_QUERY
  );

  const gallery = response?.data;
  if (!gallery) {
    return null;
  }

  const artworksCount = (gallery.artworks as any)?.count || 0;
  const eventsCount = (gallery.events as any)?.count || 0;

  const profile: ProfileData = {
    coverImage: gallery.cover?.url,
    name: gallery.name,
    region: '',
    avatar: gallery.avatar?.url || '/placeholder-avatar.png',
    stats: [
      { number: artworksCount, label: '館藏' },
      { number: eventsCount, label: '場活動' },
    ],
    about: gallery.about || [],
  };

  return { profile };
}

/**
 * 獲取畫廊的館藏
 */
export async function fetchGalleryArtworks(
  slug: string
): Promise<ArtworkListItem[] | null> {
  const query = {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      ownedByGallery: {
        documentId: {
          $eq: slug,
        },
      },
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };

  const response = await fetchContentType<{ data: Artwork[] }>('artworks', query);
  return (response.data || []).map(mapArtworkListItem);
}

/**
 * 獲取畫廊的活動
 */
export async function fetchGalleryEvents(
  slug: string
): Promise<EventListItem[] | null> {
  const query = {
    ...EVENT_LIST_QUERY,
    filters: {
      galleries: {
        documentId: {
          $eq: slug,
        },
      },
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };

  const response = await fetchContentType<{ data: Event[] }>('events', query);
  return (response.data || []).map(mapEventListItem);
}

/**
 * 獲取畫廊合作的藝術家
 */
export async function fetchGalleryArtists(
  slug: string
): Promise<ArtistAvatarListItem[] | null> {
  const query = {
    ...ARTIST_AVATAR_LIST_QUERY,
    filters: {
      ...ARTIST_AVATAR_LIST_QUERY.filters,
      galleries: {
        documentId: {
          $eq: slug,
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