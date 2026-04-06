/**
 * Explore Page
 * 
 * 探索頁面 - 各 Section 獨立 Suspense 載入
 */

import fetchContentType from "@/lib/strapi/fetchContentType";
import { MaterialListItem } from "@/lib/model/material";
import { EVENT_LIST_QUERY, mapEventListItem } from "@/lib/model/event";
import { ArtistAvatarListItem, ARTIST_AVATAR_LIST_QUERY } from "@/lib/model/artistAvatarList";
import { GalleryListItem, GALLERY_LIST_QUERY, mapGalleryListItem } from "@/lib/model/gallery";
import { SuspenseScroller } from "@/app/components/scroller/SuspenseScroller";

// ==================== Fetchers ====================

async function fetchMaterials() {
  const response = await fetchContentType<{ data: MaterialListItem[] }>('material-list');
  return response.data || [];
}

async function fetchArtists() {
  const response = await fetchContentType<{ data: ArtistAvatarListItem[] }>('artist-list', ARTIST_AVATAR_LIST_QUERY);
  return response.data || [];
}

async function fetchGalleries() {
  const response = await fetchContentType('galleries', GALLERY_LIST_QUERY);
  return (response.data || []).map(mapGalleryListItem);
}

// ==================== Page 組件 ====================

const ExplorePage = () => {
  return (
    <div className="page-transition pt-8">
      <SuspenseScroller
        category="materials"
        title="媒材"
        fetcher={fetchMaterials}
        skeletonCount={6}
        className="mb-2 md:mb-4" />
      <SuspenseScroller
        category="artists"
        title="藝術家"
        fetcher={fetchArtists}
        skeletonCount={6}
        className="mb-2 md:mb-4" />
      <SuspenseScroller
        category="galleries"
        title="畫廊"
        fetcher={fetchGalleries}
        skeletonCount={6}
        className="mb-2 md:mb-4" />
    </div>
  );
};

export default ExplorePage;