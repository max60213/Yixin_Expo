/**
 * Category List Page
 * 
 * 統一處理所有分類列表頁
 * 支援：artworks, materials, artists, galleries, events, insights
 * 
 * Query Parameters 過濾：
 * - /artworks?gallery=documentId  → 該畫廊的作品
 * - /artworks?artist=documentId   → 該藝術家的作品
 * - /artworks?material=documentId → 使用該材質的作品
 * - /artworks?event=documentId    → 該活動的作品
 * - /events?gallery=documentId    → 該畫廊的活動
 * - /artists?gallery=documentId   → 該畫廊的藝術家
 * - /artists?event=documentId     → 該活動的藝術家
 */

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import fetchContentType from "@/app/lib/strapi/fetchContentType";
import ArtworksMasonry from '@/app/components/artworks-masonry/ArtworksMasonry';

// 強制每次導航都重新執行，避免顯示 cache 內容
export const dynamic = 'force-dynamic';
import { SuspenseArtworksMasonry } from '@/app/components/artworks-masonry/SuspenseArtworksMasonry';
import CollectionGrid from '@/app/components/collection-page/CollectionGrid';
import GridSkeleton from '@/app/components/collection-page/GridSkeleton';
import { ARTWORK_LIST_QUERY, ArtworkListItem } from "@/lib/model/artwork";
import { MaterialListItem } from "@/lib/model/material";
import { ArtistAvatarListItem, ARTIST_AVATAR_LIST_QUERY } from "@/lib/model/artistAvatarList";
import { GalleryListItem, GALLERY_LIST_QUERY, mapGalleryListItem } from "@/lib/model/gallery";
import { EventListItem, EVENT_LIST_QUERY, mapEventListItem } from "@/lib/model/event";
import { InsightListItem, INSIGHT_LIST_QUERY, mapInsightListItem } from "@/lib/model/insight";
import { StrapiResponse } from "@/lib/model";
import Header from "@/app/components/Header";
import "@/app/components/collection-page/collection-page.css";

// ==================== Types ====================

type CategoryType = 'artworks' | 'materials' | 'artists' | 'galleries' | 'events' | 'insights';

interface SearchParams {
  gallery?: string;
  artist?: string;
  material?: string;
  event?: string;
}

const VALID_CATEGORIES = new Set<CategoryType>(['artworks', 'materials', 'artists', 'galleries', 'events', 'insights']);

// ==================== Query Builders ====================

const buildFilters = (params: SearchParams, mappings: Record<string, string>) => {
  const filters: Record<string, any> = {};
  for (const [param, field] of Object.entries(mappings)) {
    if (params[param as keyof SearchParams]) {
      filters[field] = { documentId: { $eq: params[param as keyof SearchParams] } };
    }
  }
  return filters;
};

// ==================== Category Fetchers ====================

const categoryFetchers = {
  artworks: (params: SearchParams) => {
    const query = {
      ...ARTWORK_LIST_QUERY,
      filters: {
        ...ARTWORK_LIST_QUERY.filters,
        ...buildFilters(params, {
          gallery: 'ownedByGallery',
          artist: 'artists',
          material: 'materials',
          event: 'events',
        }),
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
  },

  events: (params: SearchParams) => {
    const query = {
      ...EVENT_LIST_QUERY,
      filters: buildFilters(params, { gallery: 'galleries', artist: 'artists' }),
      pagination: {
        page: 1,
        pageSize: 20,
      },
    };
    return {
      fetchData: async () => {
        const res = await fetchContentType<{ data: EventListItem[] }>('events', query);
        return (res.data || []).map(mapEventListItem);
      },
    };
  },

  materials: () => ({
    fetchData: async () => {
      const res = await fetchContentType<{ data: MaterialListItem[] }>('material-list');
      return res.data || [];
    },
  }),

  artists: (params: SearchParams) => {
    const additionalFilters = buildFilters(params, {
      gallery: 'galleries',
      event: 'events',
    });
    const query = Object.keys(additionalFilters).length > 0
      ? {
        ...ARTIST_AVATAR_LIST_QUERY,
        filters: {
          ...ARTIST_AVATAR_LIST_QUERY.filters,
          ...additionalFilters
        }
      }
      : ARTIST_AVATAR_LIST_QUERY;

    return {
      fetchData: async () => {
        const res = await fetchContentType<{ data: ArtistAvatarListItem[] }>('artist-list', query);
        return res.data || [];
      },
    };
  },

  galleries: () => ({
    fetchData: async () => {
      const res = await fetchContentType<{ data: GalleryListItem[] }>('galleries', GALLERY_LIST_QUERY);
      return (res.data || []).map(mapGalleryListItem);
    },
  }),

  insights: (params: SearchParams) => {
    const query = {
      ...INSIGHT_LIST_QUERY,
      filters: buildFilters(params, { gallery: 'galleries', artist: 'artists' }),
      pagination: {
        page: 1,
        pageSize: 20,
      },
    };
    return {
      fetchData: async () => {
        const res = await fetchContentType<{ data: InsightListItem[] }>('insights', query);
        return (res.data || []).map(mapInsightListItem);
      },
    };
  },
};

// ==================== Page ====================

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<SearchParams>;
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const filters = await searchParams;

  if (!VALID_CATEGORIES.has(category as CategoryType)) {
    notFound();
  }

  const fetcher = categoryFetchers[category as CategoryType];
  const config = fetcher(filters);
  const isArtworks = category === 'artworks';

  return (
    <div className="page-transition">
      <Header category={category} />
      <div className={`collection collection--${category}`}>
        {isArtworks ? (
          <Suspense fallback={<ArtworksMasonry skeletonCount={12} />}>
            <SuspenseArtworksMasonry
              fetchData={config.fetchData as () => Promise<StrapiResponse<ArtworkListItem>>}
              baseQuery={'baseQuery' in config ? config.baseQuery : undefined}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<GridSkeleton />}>
            <CollectionGrid
              category={category}
              fetchData={config.fetchData as () => Promise<any[]>}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;