import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./content-card.css";
import { InsightListItem } from "@/app/lib/model/insight";
import { PublisherBadge } from "@/app/components/utilities/PublisherBadge";

interface InsightProps {
  /** 資料,undefined 時顯示 Skeleton */
  data?: InsightListItem;
  locale?: string;
}

/**
 * InsightCard 組件
 * 
 * 支援兩種模式:
 * 1. 傳入 data - 顯示真實內容
 * 2. data 為 undefined - 顯示 Skeleton
 */
export const InsightCard = ({ data, locale = "zh-TW" }: InsightProps) => {
  const title = data?.title;
  const cover = data?.cover;
  const galleries = data?.galleries;
  const documentId = data?.documentId;
  const publishDate = data?.publishDate;

  // 定義預設佔位圖
  const PLACEHOLDER = "/placeholder-cover.png";

  // 決定圖片來源（有圖片用圖片，沒有用佔位圖）
  const imageSrc = cover?.url ? strapiImage(cover.url) : PLACEHOLDER;
  const imageAlt = cover?.alternativeText || title || "Insight";

  return (
    <div className="card card--insight">
      {/* 背景可點擊區域 */}
      {documentId && <Link href={`/insights/${documentId}`} className="card__click-area" />}

      {/* 專欄圖片 */}
      <div className="card__image">
        {data ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            placeholder="blur"
            blurDataURL={getBlurDataURL(imageSrc)}
            sizes="
              (min-width: 1400px) 500px,
              (min-width: 1100px) 33vw,
              (min-width: 800px) 50vw,
              100vw
            "
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <Skeleton height="100%" />
        )}
      </div>

      {/* 卡片內容 */}
      <div className="card__content">
        {/* Prefix: 發布者與日期 */}
        <div className="card__content__prefix">
          {galleries && galleries.length > 0 ? (
            galleries.map((g) => <PublisherBadge key={g.documentId} gallery={g} />)
          ) : (
            !data && <Skeleton width={80} />
          )}
          {publishDate ? (
            <span className="card__content__prefix__date">
              {publishDate}
            </span>
          ) : (
            !data && <Skeleton className="ms-3" width={60} />
          )}
        </div>

        {/* 標題 */}
        <h3 className="card__content__title line-clamp-2">
          {title || <Skeleton width="80%" />}
        </h3>

        {/* Footer: 簡單訊息 */}
        {!data && (
          <div className="card__content__footer">
            <Skeleton width={50} />
          </div>
        )}
      </div>
    </div>
  );
};
