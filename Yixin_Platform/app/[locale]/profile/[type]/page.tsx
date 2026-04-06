/**
 * User Collections Page
 * 
 * 使用者收藏頁面 - 根據 type 顯示不同類型的收藏
 * 
 * 路由：
 * - /profile/artworks → 收藏的藝術品
 * - /profile/events   → 收藏的活動（未來）
 * - /profile/insights → 收藏的文章（未來）
 * 
 * 安全性：
 * - 需要登入才能訪問
 * - userId 從 session 取得，無法透過 URL 查看他人收藏
 */

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { requireAuth } from '@/app/lib/auth/requireAuth';
import { fetchUserProfile } from '@/app/lib/model/user';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';
import { SuspenseArtworksMasonry } from '@/app/components/artworks-masonry/SuspenseArtworksMasonry';
import Header from '@/app/components/Header';
import { ARTWORK_LIST_QUERY, ArtworkListItem } from '@/lib/model/artwork';
import { StrapiResponse } from '@/lib/model';
import '@/app/components/collection-page/collection-page.css';

// ==================== Types ====================

type CollectionType = 'artworks' | 'events' | 'insights';

const VALID_TYPES = new Set<CollectionType>(['artworks', 'events', 'insights']);

const TYPE_TITLES: Record<string, string> = {
  artworks: '收藏的作品',
  events: '收藏的活動',
  insights: '收藏的文章',
};

// ==================== Fetchers ====================

const getCollectionFetcher = (type: CollectionType, userDocumentId: string) => {
  switch (type) {
    case 'artworks': {
      const query = {
        ...ARTWORK_LIST_QUERY,
        filters: {
          ...ARTWORK_LIST_QUERY.filters,
          collectedBy: {
            documentId: { $eq: userDocumentId },
          },
        },
        pagination: {
          page: 1,
          pageSize: 30,
        },
      };
      return {
        fetchData: () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', query),
        baseQuery: query,
      };
    }
    // 未來擴展其他類型
    case 'events':
    case 'insights':
    default:
      return null;
  }
};

// ==================== Page ====================

interface Props {
  params: Promise<{ type: string }>;
}

const CollectionsPage = async ({ params }: Props) => {
  // 驗證登入
  await requireAuth();

  const { type } = await params;

  // 驗證 type 是否有效
  if (!VALID_TYPES.has(type as CollectionType)) {
    notFound();
  }

  // 取得使用者資訊
  const profileData = await fetchUserProfile();
  const userDocumentId = profileData?.profile.documentId;

  if (!userDocumentId) {
    notFound();
  }

  // 取得對應的 fetcher
  const fetcher = getCollectionFetcher(type as CollectionType, userDocumentId);

  if (!fetcher) {
    // 尚未支援的類型
    return (
      <div className="page-transition">
        <Header title={TYPE_TITLES[type] || type} />
        <div className="collection">
          <div className="collection__empty">此功能尚未開放</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <Header title={TYPE_TITLES[type] || type} />
      <div className={`collection collection--${type}`}>
        <Suspense fallback={<ArtworksMasonry skeletonCount={12} />}>
          <SuspenseArtworksMasonry
            fetchData={fetcher.fetchData}
            baseQuery={fetcher.baseQuery}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default CollectionsPage;
