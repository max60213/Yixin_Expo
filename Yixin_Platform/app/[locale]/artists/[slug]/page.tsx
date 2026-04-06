/**
 * Artist Detail Page
 * 
 * 藝術家詳情頁面
 * 顯示藝術家的 Profile、作品列表、活動列表
 * 各 Section 獨立 Suspense 載入
 */

import {
  fetchArtistProfile,
  fetchArtistArtworks,
  fetchArtistEvents,
} from '@/app/lib/model/artist';
import { SuspenseScroller } from '@/app/components/scroller/SuspenseScroller';
import ProfilePage from '@/app/templates/ProfilePage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;

  // 建立 Promise（不 await），讓 ProfilePageTemplate 內部處理
  const profilePromise = fetchArtistProfile(slug);

  return (
    <ProfilePage
      profilePromise={profilePromise}
      tabs={[
        { key: 'artworks', label: '作品', anchorId: 'artworks' },
        { key: 'events', label: '參與活動', anchorId: 'events' },
      ]}
    >
      <SuspenseScroller id="artworks" category="artworks" title="作品" fetcher={() => fetchArtistArtworks(slug)} href={`/artworks?artist=${slug}`} />
      <SuspenseScroller id="events" category="events" title="參與活動" fetcher={() => fetchArtistEvents(slug)} href={`/events?artist=${slug}`} skeletonCount={4} />
    </ProfilePage>
  );
}