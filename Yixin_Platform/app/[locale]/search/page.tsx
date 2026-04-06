/**
 * Search Page
 * 
 * 搜尋頁面 - 使用 URL 參數 q 搜尋 5 種資料
 * 使用 SuspenseScroller，每個 Section 獨立載入
 */

import { Suspense } from 'react';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import { EVENT_LIST_QUERY, mapEventListItem, type EventListItem } from '@/app/lib/model/event';
import { INSIGHT_LIST_QUERY, mapInsightListItem, type InsightListItem } from '@/app/lib/model/insight';
import { ARTIST_LIST_QUERY } from '@/app/lib/model/artist';
import { GALLERY_LIST_QUERY, mapGalleryListItem } from '@/app/lib/model/gallery';
import { ARTWORK_LIST_QUERY } from '@/app/lib/model/artwork';
import { SuspenseScroller } from '@/app/components/scroller/SuspenseScroller';
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';
import SectionHeader from '@/app/components/SectionHeader';
import Header from '@/app/components/Header';

// ==================== Search Fetchers ====================

function createSearchEvents(query: string) {
  return async (): Promise<EventListItem[]> => {
    const response = await fetchContentType('events', {
      ...EVENT_LIST_QUERY,
      filters: { title: { $containsi: query } },
      pagination: { page: 1, pageSize: 10 },
    });
    return (response.data || []).map(mapEventListItem);
  };
}

function createSearchInsights(query: string) {
  return async () => {
    const response = await fetchContentType('insights', {
      ...INSIGHT_LIST_QUERY,
      filters: { title: { $containsi: query } },
      pagination: { page: 1, pageSize: 10 },
    });
    return (response.data || []).map(mapInsightListItem);
  };
}

function createSearchArtists(query: string) {
  return async () => {
    const response = await fetchContentType('artists', {
      ...ARTIST_LIST_QUERY,
      filters: { name: { $containsi: query } },
      pagination: { page: 1, pageSize: 10 },
    });
    return response.data || [];
  };
}

function createSearchGalleries(query: string) {
  return async () => {
    const response = await fetchContentType('galleries', {
      ...GALLERY_LIST_QUERY,
      filters: { name: { $containsi: query } },
      pagination: { page: 1, pageSize: 10 },
    });
    return (response.data || []).map(mapGalleryListItem);
  };
}

function createSearchMaterials(query: string) {
  return async () => {
    const response = await fetchContentType('material-list', {
      filters: { name: { $containsi: query } },
    });
    console.log(response);
    return response.data || [];
  };
}

// ==================== Artworks Section ====================

async function ArtworksSection({ query }: { query: string }) {
  const response = await fetchContentType('artworks', {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      title: { $containsi: query },
    },
    pagination: { page: 1, pageSize: 30 },
  });

  if (!response.data || response.data.length === 0) return null;

  return (
    <>
      <SectionHeader title="作品" className="mb-4!" />
      <ArtworksMasonry
        initialData={response}
        pageSize={20}
        baseQuery={{
          ...ARTWORK_LIST_QUERY,
          filters: {
            ...ARTWORK_LIST_QUERY.filters,
            title: { $containsi: query },
          },
        }}
      />
    </>
  );
}

// ==================== Page Component ====================

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  if (!q) {
    return (
      <div className="page-transition pt-8 flex items-center justify-center min-h-[50vh]">
        <h2 className="text-text-secondary">請輸入搜尋關鍵字</h2>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <Header title={q}>
        <p className='text-text-secondary'>的搜尋結果</p>
      </Header>
      {/* 活動 */}
      <SuspenseScroller
        category="events"
        title="活動"
        fetcher={createSearchEvents(q)}
        skeletonCount={5}
        className="mb-2 md:mb-4"
        clean
      />

      {/* 專欄 */}
      <SuspenseScroller
        category="insights"
        title="專欄"
        fetcher={createSearchInsights(q)}
        skeletonCount={5}
        className="mb-2 md:mb-4"
        clean
      />


      {/* 媒材 */}
      <SuspenseScroller
        category="materials"
        title="媒材"
        fetcher={createSearchMaterials(q)}
        skeletonCount={5}
        className="mb-2 md:mb-4"
        clean
      />

      {/* 藝術家 */}
      <SuspenseScroller
        category="artists"
        title="藝術家"
        fetcher={createSearchArtists(q)}
        skeletonCount={5}
        className="mb-2 md:mb-4"
        clean
      />

      {/* 畫廊 */}
      <SuspenseScroller
        category="galleries"
        title="畫廊"
        fetcher={createSearchGalleries(q)}
        skeletonCount={5}
        className="mb-2 md:mb-4"
        clean
      />

      {/* 作品 */}
      <Suspense fallback={<ArtworksMasonry skeletonCount={12} />}>
        <ArtworksSection query={q} />
      </Suspense>
    </div>
  );
}