/**
 * ProfilePage Template (Server Component)
 * 
 * Profile 頁面的模板組件
 * 使用 Async Wrapper 模式處理 Suspense
 */

import Image from 'next/image';
import { Suspense } from 'react';
import Tabs, { type Tab } from '@/app/templates/profile-page/Tabs';
import Header from '@/app/templates/profile-page/Header';
import ProfileAnimations from '@/app/templates/profile-page/ProfileAnimations';
import "./profile-page.css";
import type { ReactNode } from 'react';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

// ========== TYPE DEFINITIONS ==========

/**
 * ProfilePage 的個人資料配置
 */
export interface ProfileData {
  documentId?: string;
  coverImage?: string;
  name: string;
  country?: string;
  region?: string;
  avatar?: string;
  about: BlocksContent;
  stats: Array<{ number: number; label: string }>;
}

/**
 * ProfilePage 組件的 Props
 */
export interface ProfilePageProps {
  /** Profile Promise（用於內部 Suspense await） */
  profilePromise?: Promise<{ profile: ProfileData } | null>;
  /** 或直接傳入 profile 資料 */
  profile?: ProfileData;
  /** Tabs 配置 */
  tabs?: Tab[];
  /** 是否為自己的頁面 */
  isMe?: boolean;
  /** Sections slot (Suspense 包裹的 Scrollers) */
  children?: ReactNode;
}

// ========== ASYNC COMPONENTS ==========

/**
 * Async Header - 處理 Header 資料載入
 */
const AsyncHeader = async ({
  promise,
  isMe = false,
}: {
  promise: Promise<{ profile: ProfileData } | null>;
  isMe?: boolean;
}) => {
  const result = await promise;
  if (!result) return <Header loading />;

  const { profile } = result;
  const name = isMe && profile.name
    ? profile.name.slice(0, 1).toUpperCase() + profile.name.slice(1)
    : profile.name;

  // 非 isMe 時，如果沒有 avatar 則 fallback 到 placeholder
  const avatarUrl = isMe
    ? profile.avatar  // isMe 時由 Header 處理 Avvvatars fallback
    : (profile.avatar || '/placeholder-avatar.png');

  return (
    <>
      <Header
        name={name}
        country={profile.country}
        region={profile.region}
        stats={profile.stats}
        avatar={avatarUrl}
        isMe={isMe}
      />
      {/* 動畫在 Header 載入後執行 */}
      <ProfileAnimations isLoading={false} />
    </>
  );
};

/**
 * Async Tabs - 處理 Tabs 標題載入
 */
const AsyncTabs = async ({
  promise,
  profile,
  tabs,
}: {
  promise?: Promise<{ profile: ProfileData } | null>;
  profile?: ProfileData;
  tabs: Tab[];
}) => {
  let title = profile?.name;
  if (!title && promise) {
    const result = await promise;
    title = result?.profile.name;
  }
  return <Tabs tabs={tabs} title={title} className="profile-tabs" />;
};

/**
 * Async Cover - 處理 Cover Image 載入
 */
const AsyncCover = async ({
  promise,
}: {
  promise: Promise<{ profile: ProfileData } | null>;
}) => {
  const result = await promise;
  if (!result?.profile.coverImage) return null;

  return (
    <div className="profile-cover">
      <Image
        src={result.profile.coverImage}
        alt="Profile Cover"
        width={1526}
        height={659}
      />
    </div>
  );
};

// ========== MAIN COMPONENT ==========

/**
 * ProfilePage Template
 * 
 * 內部自包含 Suspense：
 * - Header 在自己的 Suspense 內 await
 * - Tabs 在自己的 Suspense 內 await
 * - Children（SuspenseScroller）各自有 Suspense
 * 
 * 頁面不需要外層 Suspense！
 */
export const ProfilePage = ({
  profilePromise,
  profile,
  tabs = [],
  isMe = false,
  children,
}: ProfilePageProps) => {
  // 判斷是否為 skeleton 模式（沒有 profile 也沒有 promise）
  const isSkeletonMode = !profile && !profilePromise;

  return (
    <div className="profile-page page-transition">
      {/* 1. 頂部 Cover Image */}
      {profilePromise ? (
        <Suspense fallback={null}>
          <AsyncCover promise={profilePromise} />
        </Suspense>
      ) : profile?.coverImage && (
        <div className="profile-cover">
          <Image
            src={profile.coverImage}
            alt="Profile Cover"
            width={1526}
            height={659}
          />
        </div>
      )}

      {/* 2. Header (with Suspense) + GSAP 動畫 */}
      {profilePromise ? (
        <Suspense fallback={<Header loading />}>
          <AsyncHeader promise={profilePromise} isMe={isMe} />
        </Suspense>
      ) : (
        <>
          <Header
            name={profile?.name}
            country={profile?.country}
            region={profile?.region}
            stats={profile?.stats}
            avatar={isMe ? profile?.avatar : (profile?.avatar || '/placeholder-avatar.png')}
            loading={isSkeletonMode}
            isMe={isMe}
          />
          <ProfileAnimations isLoading={isSkeletonMode} />
        </>
      )}

      {/* Skeleton 時也需要動畫（雖然 isLoading=true 不會執行動畫） */}
      {isSkeletonMode && <ProfileAnimations isLoading={true} />}

      {/* 3. Tabs (with Suspense) */}
      <Suspense fallback={<Tabs loading className="profile-tabs" />}>
        <AsyncTabs
          promise={profilePromise}
          profile={profile}
          tabs={tabs}
        />
      </Suspense>

      {/* 4. Sections (Suspense 包裹的 Scrollers) */}
      <div className="profile-content">
        {children}
      </div>
    </div>
  );
};

export default ProfilePage;