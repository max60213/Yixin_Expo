/**
 * Activities Page - 作品活動紀錄頁面
 * 
 * Server Component，使用 Suspense 實現漸進式載入
 */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import "./activities.css";
import SectionHeader from "@/app/components/SectionHeader";
import Owner from "@/app/components/Owner";
import ArtworkHeader from "@/app/[locale]/artworks/[slug]/components/ArtworkHeader";
import BlockchainItem from "@/app/[locale]/artworks/[slug]/components/BlockchainItem";
import RecordsList from "./components/RecordsList";
import HelpButton from "./components/HelpButton";
import fetchContentType from "@/app/lib/strapi/fetchContentType";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import type { Artwork } from "@/app/lib/model";
import { mapArtworkDetail, ARTWORK_DETAIL_QUERY, type ArtworkDetail } from "@/app/lib/model/artwork";

// ========== HELPER FUNCTIONS ==========

const formatYear = (yearCreate?: string | null, yearFinish?: string | null) => {
  if (yearCreate && yearFinish) return `${yearCreate} - ${yearFinish}`;
  if (yearCreate) return yearCreate;
  if (yearFinish) return yearFinish;
  return '未知年份';
};

// ========== MOCK DATA (暫時使用) ==========

import { mockRecords, mockPastOwners } from '../mockData';

// ========== SKELETON COMPONENTS ==========

const BannerSkeleton = () => (
  <header className="banner">
    <div className="banner__info">
      <Skeleton height={32} width="60%" />
      <Skeleton height={20} width="40%" style={{ marginTop: 8 }} />
      <hr className="divider" />
      <div className="banner__info__blockchain">
        <Skeleton height={16} width={100} />
        <Skeleton height={16} width={100} />
        <Skeleton height={16} width={100} />
      </div>
    </div>
    <div className="banner__artwork relative">
      <Skeleton height="100%" style={{ position: 'absolute', inset: 0 }} />
    </div>
  </header>
);

const MainSkeleton = () => (
  <main className="main">
    <div className="activities">
      <Skeleton height={24} width={120} />
      <div className="activities__list">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} height={80} style={{ marginTop: 16 }} />
        ))}
      </div>
    </div>
    <div className="side">
      <Skeleton height={24} width={100} />
      <Skeleton height={120} style={{ marginTop: 16 }} />
    </div>
  </main>
);

// ========== ASYNC COMPONENTS ==========

/**
 * Async Banner - 處理 banner 區塊
 */
const AsyncBanner = async ({ promise }: { promise: Promise<ArtworkDetail | null> }) => {
  const detail = await promise;
  if (!detail) return null;

  const placeholder = "/placeholder-avatar.png";

  return (
    <header className="banner">
      <div className="banner__info">
        <ArtworkHeader
          documentId={detail.documentId}
          title={detail.title}
          artists={detail.artists || null}
          year={formatYear(detail.yearCreate, detail.yearFinish)}
          state={detail.state}
        />
        <hr className="divider" />
        <div className="banner__info__blockchain">
          <BlockchainItem label="最終錨定" value="20,312,884" href="https://sepolia.etherscan.io/tx/0xce6cd0bbbd204b200280ebc9a31ee27b8db498e0dfb5c2205f7f113869714de3" />
          <BlockchainItem label="Tx" value="0xb1f3…9ac7" />
          <BlockchainItem label="上次定錨" value="2025.10.25" />
        </div>
        <HelpButton className="mt-4 link link-secondary" />
      </div>
      <div className="banner__artwork relative">
        <Image
          src={detail.scannedImage?.url || placeholder}
          alt={detail.title}
          fill
          sizes="(min-width: 800px): 30vw, 100vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </header>
  );
};

/**
 * Async Main - 處理主要內容區塊
 */
const AsyncMain = async ({ promise }: { promise: Promise<ArtworkDetail | null> }) => {
  const detail = await promise;
  if (!detail) return null;

  // TODO: 之後從 API 取得真實的 records 和 pastOwners
  const records = mockRecords;
  const pastOwners = mockPastOwners;

  return (
    <main className="main">
      <div className="activities">
        <SectionHeader title="活動紀錄" />
        <RecordsList records={records} />
      </div>
      <div className="side">
        <SectionHeader title="所有權" />
        <div className="owner__list">
          <Owner
            className="side-shadow"
            isCurrent={true}
            address="0xcf78...a9b6"
            name="名冠藝術館"
            acquiredAt="2025-06-30T13:55:29Z"
            txHash="0x6f7a...8b9c"
          />
          <div className="owner__list__past side-shadow">
            {pastOwners.map((owner, index) => (
              <div key={owner.id}>
                <Owner
                  address={owner.address}
                  name={owner.name}
                  acquiredAt={owner.acquiredAt}
                  txHash={owner.txHash}
                />
                {index < pastOwners.length - 1 && <hr className="divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

// ========== PAGE COMPONENT ==========

interface ActivitiesPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const ActivitiesPage = async ({ params }: ActivitiesPageProps) => {
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

  return (
    <div className="activities-page page-transition">
      <Suspense fallback={<BannerSkeleton />}>
        <AsyncBanner promise={artworkPromise} />
      </Suspense>

      <Suspense fallback={<MainSkeleton />}>
        <AsyncMain promise={artworkPromise} />
      </Suspense>
    </div>
  );
};

export default ActivitiesPage;