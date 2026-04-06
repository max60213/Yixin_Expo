/**
 * Profile Page
 *
 * 個人頁面
 * Profile 與 Artworks 獨立 Suspense 載入
 */

import { ProfilePage as ProfilePageTemplate } from '@/app/templates/ProfilePage';
import { fetchUserProfile, fetchUserArtworks } from '@/app/lib/model/user';
import { SuspenseScroller } from '@/app/components/scroller/SuspenseScroller';
import { requireAuth } from '@/app/lib/auth/requireAuth';

/**
 * Profile Page - 不阻塞，路由瞬間切換
 * 需要登入才能訪問，未登入會自動重導向至登入頁面
 */
export default async function ProfilePage() {
  // 檢查登入狀態，未登入會自動 redirect 到 /auth/login
  await requireAuth();

  // 建立 Promise（不 await！讓頁面先渲染）
  const profilePromise = fetchUserProfile();

  // 建立一個會等待 profile 的 fetcher
  const artworksFetcher = async () => {
    const profileData = await profilePromise;
    const userDocumentId = profileData?.profile.documentId;
    if (!userDocumentId) return null;
    return fetchUserArtworks(userDocumentId);
  };

  return (
    <ProfilePageTemplate
      profilePromise={profilePromise}
      tabs={[
        { key: 'artworks', label: '收藏', anchorId: 'artworks' },
      ]}
      isMe={true}
    >
      <SuspenseScroller
        id="artworks"
        category="artworks"
        title="收藏"
        fetcher={artworksFetcher}
        href="/profile/artworks"
      />
    </ProfilePageTemplate>
  );
}