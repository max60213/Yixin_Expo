import { Suspense } from "react";
import { notFound } from "next/navigation";
import fetchContentType from "@/app/lib/strapi/fetchContentType";
import { INSIGHT_DETAIL_QUERY, mapInsightDetail, fetchInsightArtists, type Insight } from "@/lib/model/insight";
import ArticlePage from "@/app/templates/ArticlePage/ArticlePage";
import { ARTWORK_LIST_QUERY, type ArtworkListItem } from "@/lib/model/artwork";
import { StrapiResponse } from "@/lib/model";
import SuspenseScroller from "@/app/components/scroller/SuspenseScroller";
import SectionHeader from "@/app/components/SectionHeader";
import ArtworksMasonry from "@/components/artworks-masonry/ArtworksMasonry";
import { SuspenseArtworksMasonry } from "@/app/components/artworks-masonry/SuspenseArtworksMasonry";

// 建立帶有 insight filter 的 artwork query
const buildInsightArtworksQuery = (insightDocumentId: string) => ({
  ...ARTWORK_LIST_QUERY,
  filters: {
    ...ARTWORK_LIST_QUERY.filters,
    insights: { documentId: { $eq: insightDocumentId } },
  },
  pagination: { page: 1, pageSize: 30 },
});

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;

  // 從 Strapi 獲取專欄資料
  const response = await fetchContentType<{ data: Insight }>(
    `insights/${slug}`,
    INSIGHT_DETAIL_QUERY
  );

  if (!response?.data) {
    notFound();
  }

  const insight = mapInsightDetail(response.data);
  const insightDocumentId = response.data.documentId;

  // Artworks query 和 fetcher
  const artworksQuery = buildInsightArtworksQuery(insightDocumentId);
  const fetchArtworks = () => fetchContentType<StrapiResponse<ArtworkListItem>>('artworks', artworksQuery);

  return (
    <ArticlePage
      title={insight.title}
      cover={insight.cover}
      publishDate={insight.publishDate}
      galleries={insight.galleries}
      content={insight.content}
      className="article--insight"
    >
      {insight.artistCount > 0 && (
        <SuspenseScroller className="mb-2 md:mb-4" clean id="artists" category="artists" title="藝術家" fetcher={() => fetchInsightArtists(insightDocumentId)} href={`/artists?insight=${insightDocumentId}`} />
      )}
      {insight.artworkCount > 0 && (
        <>
          <SectionHeader title="相關作品" href={`/artworks?insight=${insightDocumentId}`} className="mb-4!" />
          <Suspense fallback={<ArtworksMasonry skeletonCount={8} />}>
            <SuspenseArtworksMasonry fetchData={fetchArtworks} baseQuery={artworksQuery} />
          </Suspense>
        </>
      )}
    </ArticlePage>
  );
}
