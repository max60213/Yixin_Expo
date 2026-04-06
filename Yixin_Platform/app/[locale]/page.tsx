import { Suspense } from 'react';
import './home/home.css';
import Carousel from '@/app/components/Carousel';
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';
import { SuspenseArtworksMasonry } from '@/app/components/artworks-masonry/SuspenseArtworksMasonry';
import SectionHeader from '@/app/components/SectionHeader';
import { SuspenseScroller } from '@/app/components/scroller/SuspenseScroller';
import fetchContentType from '@/app/lib/strapi/fetchContentType';
import { ARTWORK_LIST_QUERY, type ArtworkListItem } from '@/app/lib/model/artwork';
import { EVENT_LIST_QUERY, mapEventListItem, type EventListItem } from '@/app/lib/model/event';
import { INSIGHT_LIST_QUERY, mapInsightListItem, type InsightListItem } from '@/app/lib/model/insight';
import { FEATURED_LIST_QUERY, mapFeaturedListItem, isFeaturedActive, type FeaturedListItem } from '@/app/lib/model/featured';
import { StrapiResponse } from '@/app/lib/model';

async function fetchFeatured(): Promise<FeaturedListItem[]> {
  const response = await fetchContentType('featureds', {
    ...FEATURED_LIST_QUERY,
    pagination: { page: 1, pageSize: 10 },
  });
  return (response.data || []).map(mapFeaturedListItem).filter(isFeaturedActive);
}

async function AsyncCarousel() {
  const data = await fetchFeatured();
  return <Carousel data={data} />;
}

async function fetchEvents(): Promise<EventListItem[]> {
  const response = await fetchContentType('events', {
    ...EVENT_LIST_QUERY,
    pagination: { page: 1, pageSize: 10 },
  });
  return (response.data || []).map(mapEventListItem);
}

async function fetchInsights(): Promise<InsightListItem[]> {
  const response = await fetchContentType('insights', {
    ...INSIGHT_LIST_QUERY,
    pagination: { page: 1, pageSize: 10 },
  });
  return (response.data || []).map(mapInsightListItem);
}

// Artworks query 和 fetcher
const artworksQuery = {
  ...ARTWORK_LIST_QUERY,
  pagination: { page: 1, pageSize: 30 },
};
const fetchArtworks = () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', artworksQuery);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="page-transition">
      <Suspense fallback={<Carousel />}>
        <AsyncCarousel />
      </Suspense>

      <SuspenseScroller className="mb-2 md:mb-4" category="events" title="近期活動" fetcher={fetchEvents} />
      <SuspenseScroller className="mb-2 md:mb-4" category="insights" title="專欄" fetcher={fetchInsights} />

      <SectionHeader title="探索更多" href="/artworks" className="mb-4!" />
      <Suspense fallback={<ArtworksMasonry skeletonCount={12} />}>
        <SuspenseArtworksMasonry fetchData={fetchArtworks} baseQuery={artworksQuery} pageSize={30} />
      </Suspense>
    </div>
  );
}