/**
 * Artwork Detail Page
 * 
 * 專門處理單一作品的詳細頁面
 * 使用 Suspense 實現漸進式載入
 */

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import './artwork.css';
import Viewer from './components/Viewer';
import Info from './components/Info';
import SectionHeader from '@/app/components/SectionHeader';
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';
import { SuspenseArtworksMasonry } from '@/app/components/artworks-masonry/SuspenseArtworksMasonry';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import type { Artwork, StrapiResponse } from '@/app/lib/model';
import { mapArtworkDetail, ARTWORK_DETAIL_QUERY, ARTWORK_LIST_QUERY, type ArtworkDetail, type ArtworkListItem } from '@/app/lib/model/artwork';
import { ViewerSkeleton, InfoSkeleton } from './skeletons';

// ========== ASYNC COMPONENTS ==========

/**
 * Async Viewer - 處理圖片載入
 */
const AsyncViewer = async ({ promise }: { promise: Promise<ArtworkDetail | null> }) => {
  const detail = await promise;
  if (!detail?.scannedImage) return null;

  return (
    <Viewer
      className="artwork-page__display"
      images={[
        detail.scannedImage.url,
        ...(detail.additionalImages?.map(img => img.url) || [])
      ].filter(Boolean) as string[]}
    />
  );
}

/**
 * Async Info - 處理作品資訊區塊
 */
const AsyncInfo = async ({ promise, slug }: { promise: Promise<ArtworkDetail | null>; slug: string }) => {
  const detail = await promise;
  if (!detail) return null;

  return <Info detail={detail} slug={slug} />;
}

// ========== MAIN PAGE COMPONENT ==========

interface ArtworkPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const ArtworkDetailPage = async ({ params }: ArtworkPageProps) => {
  const { slug } = await params;

  // 建立 Promise（不 await，讓 Suspense 處理）
  const fetchArtworkDetail = async (): Promise<ArtworkDetail | null> => {
    const response = await fetchContentType<{ data: Artwork }>(`artworks/${slug}`, ARTWORK_DETAIL_QUERY);
    if (!response.data) {
      notFound();
    }
    return mapArtworkDetail(response.data);
  };

  const artworkPromise = fetchArtworkDetail();

  // 取得藝術家資訊後建立相關作品 query
  const detail = await artworkPromise;
  const artistId = detail?.artists?.[0]?.documentId;
  const artistName = detail?.artists?.[0]?.name || '藝術家';

  const relatedQuery = artistId ? {
    ...ARTWORK_LIST_QUERY,
    filters: {
      artists: { documentId: { $eq: artistId } },
      documentId: { $ne: slug },
    },
    pagination: { page: 1, pageSize: 12 },
  } : null;

  const fetchRelated = relatedQuery
    ? () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', relatedQuery)
    : null;

  return (
    <div className="artwork-page page-transition">
      {/* 主要內容區域 */}
      <div className="artwork-page__content">
        {/* 圖片展示區域 */}
        <Suspense fallback={<ViewerSkeleton />}>
          <AsyncViewer promise={artworkPromise} />
        </Suspense>

        {/* 作品資訊區域 */}
        <Suspense fallback={<InfoSkeleton />}>
          <AsyncInfo promise={artworkPromise} slug={slug} />
        </Suspense>
      </div>

      {/* 相關作品 */}
      {fetchRelated && relatedQuery && (
        <div className="artwork-page__related">
          <SectionHeader title={`${artistName} 的其他作品`} href={`/artworks?artist=${artistId}`} className="mb-4!" />
          <Suspense fallback={<ArtworksMasonry skeletonCount={6} />}>
            <SuspenseArtworksMasonry fetchData={fetchRelated} baseQuery={relatedQuery} pageSize={30} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailPage;
