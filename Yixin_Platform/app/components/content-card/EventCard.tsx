import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./content-card.css";
import { EventListItem } from "@/app/lib/model/event";
import { PublisherBadge } from "@/app/components/utilities/PublisherBadge";

interface EventProps {
  /** 資料,undefined 時顯示 Skeleton */
  data?: EventListItem;
  locale?: string;
}

/**
 * EventCard 組件
 * 
 * 支援兩種模式:
 * 1. 傳入 data - 顯示真實內容
 * 2. data 為 undefined - 顯示 Skeleton
 */
export const EventCard = ({ data, locale = "zh-TW" }: EventProps) => {
  const title = data?.title;
  const cover = data?.cover;
  const gallery = data?.gallery;
  const documentId = data?.documentId;
  const publishDate = data?.publishDate;
  const tags = data?.tags;

  // 定義預設佔位圖
  const PLACEHOLDER = "/placeholder-cover.png";

  // 決定圖片來源（有圖片用圖片，沒有用佔位圖）
  const imageSrc = cover?.url ? strapiImage(cover.url) : PLACEHOLDER;
  const imageAlt = cover?.alternativeText || title || "Event";

  return (
    <div className="card card--event">
      {/* 背景可點擊區域 */}
      {documentId && <Link href={`/events/${documentId}`} className="card__click-area" />}

      {/* 活動圖片 */}
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
          {gallery && gallery.length > 0 ? (
            gallery.map((g) => <PublisherBadge key={g.documentId} gallery={g} />)
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

        {/* Footer: 標籤 */}
        {(tags && tags.length > 0) ? (
          <div className="card__content__footer">
            {tags.slice(0, 3).map((tag, index) => (
              <a key={index} className="card__content__footer__tag tag">
                #{tag}
              </a>
            ))}
          </div>
        ) : !data && (
          <div className="card__content__footer">
            <Skeleton width={50} />
            <Skeleton width={60} />
          </div>
        )}
      </div>
    </div>
  );
};