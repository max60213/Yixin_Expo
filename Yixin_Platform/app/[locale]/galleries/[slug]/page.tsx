/**
 * Gallery Detail Page
 * 
 * 畫廊詳情頁面
 * 顯示畫廊的 Profile、作品列表、活動列表、藝術家列表
 * 各 Section 獨立 Suspense 載入
 */

import { fetchGalleryProfile } from '@/app/lib/model/gallery';
import { SuspenseScroller } from '@/app/components/scroller/SuspenseScroller';
import ProfilePage from '@/app/templates/ProfilePage';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import { EVENT_LIST_QUERY, mapEventListItem, type EventListItem } from '@/app/lib/model/event';
import { INSIGHT_LIST_QUERY, mapInsightListItem, type InsightListItem } from '@/app/lib/model/insight';
import { ARTIST_AVATAR_LIST_QUERY, type ArtistAvatarListItem } from '@/app/lib/model/artistAvatarList';
import { ARTWORK_LIST_QUERY, mapArtworkListItem, type ArtworkListItem } from '@/app/lib/model/artwork';
import { SuspenseArtworksMasonry } from '@/app/components/artworks-masonry/SuspenseArtworksMasonry';
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';
import SectionHeader from '@/app/components/SectionHeader';
import { Suspense } from 'react';
import { StrapiResponse } from '@/app/lib/model';

// ==================== Gallery Data Fetchers ====================

function createGalleryEventsFetcher(slug: string) {
  return async (): Promise<EventListItem[]> => {
    const response = await fetchContentType('events', {
      ...EVENT_LIST_QUERY,
      filters: {
        galleries: {
          documentId: { $eq: slug }
        }
      },
      pagination: { page: 1, pageSize: 20 }
    });
    return (response.data || []).map(mapEventListItem);
  };
}

function createGalleryArtistsFetcher(slug: string) {
  return async (): Promise<ArtistAvatarListItem[]> => {
    const response = await fetchContentType('artist-list', {
      ...ARTIST_AVATAR_LIST_QUERY,
      filters: {
        ...ARTIST_AVATAR_LIST_QUERY.filters,
        galleries: {
          documentId: { $eq: slug }
        }
      },
    });
    return response.data || [];
  };
}

function createGalleryInsightsFetcher(slug: string) {
  return async (): Promise<InsightListItem[]> => {
    const response = await fetchContentType('insights', {
      ...INSIGHT_LIST_QUERY,
      filters: {
        galleries: {
          documentId: { $eq: slug }
        }
      },
      pagination: { page: 1, pageSize: 20 }
    });
    return (response.data || []).map(mapInsightListItem);
  };
}

function createGalleryArtworksFetcher(slug: string) {
  const artworksQuery = {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      ownedByGallery: {
        documentId: { $eq: slug }
      }
    },
    pagination: { page: 1, pageSize: 30 }
  };
  return () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', artworksQuery);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;

  // 建立 Promise（不 await），讓 ProfilePageTemplate 內部處理
  const profilePromise = fetchGalleryProfile(slug);

  // 建立 artworks query 和 fetcher
  const artworksQuery = {
    ...ARTWORK_LIST_QUERY,
    filters: {
      ...ARTWORK_LIST_QUERY.filters,
      ownedByGallery: {
        documentId: { $eq: slug }
      }
    },
    pagination: { page: 1, pageSize: 30 }
  };
  const fetchArtworks = createGalleryArtworksFetcher(slug);

  return (
    <ProfilePage
      profilePromise={profilePromise}
      tabs={[
        { key: 'events', label: '活動', anchorId: 'events' },
        { key: 'insights', label: '專欄', anchorId: 'insights' },
        { key: 'artists', label: '藝術家', anchorId: 'artists' },
        { key: 'artworks', label: '館藏', anchorId: 'artworks' },
      ]}
    >
      <SuspenseScroller id="events" category="events" title="活動" fetcher={createGalleryEventsFetcher(slug)} href={`/events?gallery=${slug}`} skeletonCount={4} />
      <SuspenseScroller id="insights" category="insights" title="專欄" fetcher={createGalleryInsightsFetcher(slug)} href={`/insights?gallery=${slug}`} skeletonCount={4} />
      <SuspenseScroller id="artists" category="artists" title="藝術家" fetcher={createGalleryArtistsFetcher(slug)} href={`/artists?gallery=${slug}`} />
      <div className='artworks anchor' id='artworks'>
        <SectionHeader title="館藏" href={`/artworks?gallery=${slug}`} className="mb-4!" />
        <Suspense fallback={<ArtworksMasonry skeletonCount={12} />}>
          <SuspenseArtworksMasonry fetchData={fetchArtworks} baseQuery={artworksQuery} />
        </Suspense>
      </div>
    </ProfilePage>
  );
}

