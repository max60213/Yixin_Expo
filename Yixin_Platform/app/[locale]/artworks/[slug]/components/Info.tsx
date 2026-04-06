/**
 * Info Component - 作品詳細資訊區塊
 */

import SectionHeader from '@/components/SectionHeader';
import ArtworkHeader from './ArtworkHeader';
import DetailRow from './DetailRow';
import { ActivityList } from './ActivityList';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { ArtworkDetail } from '@/app/lib/model/artwork';
import { mockRecords } from '../mockData';
import './info.css';

// ========== HELPER FUNCTIONS ==========

const formatYear = (yearCreate?: string | null, yearFinish?: string | null) => {
  if (yearCreate && yearFinish) return `${yearCreate} - ${yearFinish}`;
  if (yearCreate) return yearCreate;
  if (yearFinish) return yearFinish;
  return '未知年份';
};

const formatDimension = (d?: { width: number; height: number; depth?: number | null } | null) =>
  d ? `${d.width} × ${d.height}${d.depth ? ` × ${d.depth}` : ''} cm` : '未知';

const formatPrice = (price?: string | null) =>
  price ? `NTD $${parseInt(price).toLocaleString()}` : '價格待詢';

// ========== PROPS ==========

interface InfoProps {
  detail: ArtworkDetail;
  slug: string;
}

// ========== COMPONENT ==========

const Info = ({ detail, slug }: InfoProps) => {
  // 使用假資料（之後會改為 API 取得）
  const recentRecords = mockRecords;

  return (
    <div className="artwork-page__info">
      {/* 標題和基本資訊 */}
      <ArtworkHeader
        documentId={detail.documentId}
        title={detail.title}
        artists={detail.artists || null}
        year={formatYear(detail.yearCreate, detail.yearFinish)}
        state={detail.state}
      />
      <hr className="artwork-page__info__divider divider"></hr>
      {/* 詳細資訊 */}
      <div className="artwork-page__info__details">
        <DetailRow
          label="媒材"
          items={detail.materials?.map(m => ({
            name: m.name,
            href: `/artworks?material=${m.documentId}`
          })) || []}
        />
        <DetailRow
          label="尺寸"
          items={[{ name: formatDimension(detail.dimension) }]}
        />
        {detail.framedDimension &&
          <DetailRow
            label="帶框尺寸"
            items={[{ name: formatDimension(detail.framedDimension) }]}
          />}
        <DetailRow
          label="收藏者"
          items={[{
            name: detail.ownedByGallery?.name || (detail.ownership === 'Artist 畫家' ? '作者收藏' : detail.ownership || '未知'),
            href: detail.ownedByGallery ? `/galleries/${detail.ownedByGallery.documentId}` : undefined
          }]}
        />
      </div>

      {detail.about && (
        <>
          <hr className="artwork-page__info__divider divider"></hr>
          {/* 描述 */}
          <div className="artwork-page__info__description block-renderer">
            <BlocksRenderer content={detail.about} />
          </div>
        </>
      )}

      <hr className="artwork-page__info__divider divider"></hr>

      {/* 活動區塊 */}
      <div className="artwork-page__info__activities">
        <SectionHeader className="m-0!" title="近期紀錄" href={`${slug}/activities`} />
        <div className="artwork-page__info__activities__items">
          {/* 近期紀錄列表 - Client Component 處理互動 */}
          <ActivityList records={recentRecords} slug={slug} />
        </div>
        {/* 價格 */}
        <div className="artwork-page__info__activities__price">
          <span className="artwork-page__info__activities__price__value">{formatPrice(detail.price)}</span>
          <button className='btn btn--primary'>下標</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
