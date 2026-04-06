import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./content-card.css";
import { MaterialListItem } from "@/app/lib/model/material";

interface MaterialProps {
  /** 資料，undefined 時顯示 Skeleton */
  data?: MaterialListItem;
  locale?: string;
}

/**
 * MaterialCard 組件
 * 
 * 支援兩種模式:
 * 1. 傳入 data - 顯示真實內容
 * 2. data 為 undefined - 顯示 Skeleton
 */
export const MaterialCard = ({ data, locale = "zh-TW" }: MaterialProps) => {
  const title = data?.name;
  const documentId = data?.documentId;
  const image = data?.scannedImage;
  const count = data?.count;

  return (
    <div className="card card--material">
      {/* 背景可點擊區域 - 連結到統一的 artworks 分類頁 */}
      {documentId && (
        <Link
          href={`/artworks?material=${documentId}`}
          className="card__click-area"
        />
      )}

      {/* 材質圖片 */}
      <div className="card__image">
        {image?.url ? (
          <Image
            src={strapiImage(image.url)}
            alt={image.alternativeText || title || "Material"}
            fill
            placeholder="blur"
            blurDataURL={getBlurDataURL(image.url)}
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
        <h3 className="card__content__title m-0 line-clamp-1">
          {title || <Skeleton width="80%" />}
        </h3>
        <div className="card__content__footer">
          <span className="card__content__footer__description m-0">
            {count ? count + " 件" : <Skeleton width="80%" />}
          </span>
        </div>
      </div>
    </div>
  );
};