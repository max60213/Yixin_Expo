import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./content-card.css";
import { GalleryListItem } from "@/app/lib/model/gallery";

interface GalleryProps {
  /** 資料，undefined 時顯示 Skeleton */
  data?: GalleryListItem;
}

/**
 * GalleryCard 組件
 * 
 * 支援兩種模式:
 * 1. 傳入 data - 顯示真實內容
 * 2. data 為 undefined - 顯示 Skeleton
 */
export const GalleryCard = ({ data }: GalleryProps) => {
  const name = data?.name;
  const documentId = data?.documentId;
  const avatar = data?.avatar;

  // 定義預設佔位圖
  const PLACEHOLDER = "/placeholder-avatar.png";

  // 決定圖片來源（有圖片用圖片，沒有用佔位圖）
  const imageSrc = avatar?.url ? strapiImage(avatar.url) : PLACEHOLDER;
  const imageAlt = avatar?.alternativeText || name || "Gallery";

  return (
    <div className="card card--gallery">
      {/* 背景可點擊區域 */}
      {documentId && <Link href={`/galleries/${documentId}`} className="card__click-area" />}

      {/* 畫廊圖片 */}
      <div className="card__image">
        {data ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            placeholder="blur"
            blurDataURL={getBlurDataURL(imageSrc)}
            sizes="
              (min-width: 1400px) 360px,
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
      <div className="card__content">
        <h3 className="card__content__title m-0 line-clamp-2">
          {name || <Skeleton width="80%" />}
        </h3>
      </div>
    </div>
  );
};