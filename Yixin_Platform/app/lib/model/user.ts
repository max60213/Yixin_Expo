/**
 * User 型別定義和 Fetchers
 * 
 * 處理使用者相關的資料獲取
 */

import { ARTWORK_LIST_QUERY, mapArtworkListItem, type Artwork, type ArtworkListItem } from '@/app/lib/model/artwork';
import fetchSelfContent from '@/app/lib/strapi/fetchSelfContent';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import type { Artist } from '@/app/lib/model/artist';
import type { ProfileData } from '@/app/templates/ProfilePage';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

// ========== TYPE DEFINITIONS ==========

/**
 * Strapi /users/me 回應格式
 */
export interface StrapiUserMe {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // image?: StrapiImage | null; // 已從 CMS 移除
  artworks?: Artwork[];
  artists?: Artist[];
  about?: BlocksContent;
}

// ========== FETCHERS ==========

/**
 * 獲取使用者 Profile (Header 用)
 * 返回格式符合 ProfilePageTemplate 的 fetcher 介面
 */
export async function fetchUserProfile(): Promise<{ profile: ProfileData } | null> {
  const data = await fetchSelfContent<StrapiUserMe>('users/me', {
    populate: {
      artworks: {
        filters: {
          publishedAt: {
            $notNull: true,
          },
        },
        count: true,
      },
    },
  });

  if (!data || ('data' in data && Array.isArray(data.data))) {
    return null;
  }

  if (!data.username) {
    return null;
  }

  const artworksCount = (data.artworks as any)?.count || 0;

  const profile: ProfileData = {
    documentId: data.documentId,
    name: data.username,
    country: '',
    region: '',
    avatar: '/placeholder.png',
    stats: [
      { number: artworksCount, label: '收藏作品' },
    ],
    about: data.about || [],
  };

  return { profile };
}

/**
 * 獲取使用者收藏的作品 (用於 SuspenseScroller)
 * 
 * 從 /artworks 端點查詢，使用 collectedBy filter
 * Strapi 的 relation populate 不支援 pagination，所以改用這種方式
 * 
 * @param userDocumentId 使用者的 documentId
 */
export async function fetchUserArtworks(
  userDocumentId: string
): Promise<ArtworkListItem[] | null> {
  const query = {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      collectedBy: {
        documentId: {
          $eq: userDocumentId,
        },
      },
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };

  const response = await fetchContentType<{ data: Artwork[] }>('artworks', query);
  const artworks = response?.data || [];

  if (artworks.length === 0) {
    return null;
  }

  return artworks.map(mapArtworkListItem);
}
