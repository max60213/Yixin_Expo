import { Suspense } from "react";
import { notFound } from "next/navigation";
import fetchContentType from "@/app/lib/strapi/fetchContentType";
import { EVENT_DETAIL_QUERY, mapEventDetail, fetchEventArtists, type Event } from "@/lib/model/event";
import { EventInfoSection, type EventInfo } from "@/app/templates/ArticlePage/components/EventInfoSection";
import { ARTWORK_LIST_QUERY, type ArtworkListItem } from "@/lib/model/artwork";
import { StrapiResponse } from "@/lib/model";
import SuspenseScroller from "@/app/components/scroller/SuspenseScroller";
import SectionHeader from "@/app/components/SectionHeader";
import ArtworksMasonry from "@/components/artworks-masonry/ArtworksMasonry";
import { SuspenseArtworksMasonry } from "@/app/components/artworks-masonry/SuspenseArtworksMasonry";
import ArticlePage from "@/app/templates/ArticlePage/ArticlePage";

// 建立帶有 event filter 的 artwork query
const buildEventArtworksQuery = (eventDocumentId: string) => ({
  ...ARTWORK_LIST_QUERY,
  filters: {
    ...ARTWORK_LIST_QUERY.filters,
    events: { documentId: { $eq: eventDocumentId } },
  },
  pagination: { page: 1, pageSize: 30 },
});

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  const response = await fetchContentType<{ data: Event }>(
    `events/${slug}`,
    EVENT_DETAIL_QUERY
  );

  if (!response?.data) {
    notFound();
  }

  const event = mapEventDetail(response.data);
  const eventDocumentId = response.data.documentId;


  // 構建 info 物件
  const info: EventInfo = {
    ...(event.startDate && {
      duration: {
        startDate: new Date(event.startDate).toLocaleDateString('zh-TW'),
        endDate: event.endDate
          ? new Date(event.endDate).toLocaleDateString('zh-TW')
          : new Date(event.startDate).toLocaleDateString('zh-TW'),
      }
    }),
    ...(event.location && { location: event.location }),
  };

  // Artworks query 和 fetcher
  const artworksQuery = buildEventArtworksQuery(eventDocumentId);
  const fetchArtworks = () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', artworksQuery);

  return (
    <ArticlePage
      title={event.title}
      cover={event.cover}
      publishDate={event.publishDate}
      galleries={event.galleries}
      content={event.about}
      tags={event.tags}
      sidePanel={<EventInfoSection info={info} />}
    >
      {event.artistCount > 0 && (
        <SuspenseScroller className="mb-2 md:mb-4" clean id="artists" category="artists" title="藝術家" fetcher={() => fetchEventArtists(eventDocumentId)} href={`/artists?event=${eventDocumentId}`} />
      )}
      {event.artworkCount > 0 && (
        <>
          <SectionHeader title="相關作品" href={`/artworks?event=${eventDocumentId}`} className="mb-4!" />
          <Suspense fallback={<ArtworksMasonry skeletonCount={8} />}>
            <SuspenseArtworksMasonry fetchData={fetchArtworks} baseQuery={artworksQuery} />
          </Suspense>
        </>
      )}
    </ArticlePage>
  );
}