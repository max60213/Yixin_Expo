"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import { ArtworkListItem, Artwork } from "@/app/lib/model";
import { useCollections } from "@/app/context/collectionsContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./content-card.css";
import { Fragment, memo, useMemo } from "react";
import { useBreakpoints } from "@/app/hooks/useBreakpoints";

interface ArtworkProps {
  /** 資料,undefined 時顯示 Skeleton */
  data?: ArtworkListItem | Artwork;
  className?: string;
}

/**
 * ArtworkCard 組件
 * 
 * 支援兩種模式:
 * 1. 傳入 data - 顯示真實內容
 * 2. data 為 undefined - 顯示 Skeleton
 */
const ArtworkCardComponent = ({ data, className }: ArtworkProps) => {
  const router = useRouter();
  const { isCollected, toggleCollect, isAuthenticated } = useCollections("artworks");

  const documentId = data?.documentId;
  const title = data?.title;
  const yearFinish = data?.yearFinish;
  const yearCreate = data?.yearCreate;
  const artists = data?.artists;

  const { mdDown } = useBreakpoints();

  // 統一使用 scannedImage
  const image = data?.scannedImage;

  const handleToggleCollect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (documentId) {
      toggleCollect(documentId);
    }
  };

  // 穩定的 skeleton aspect ratio（只在組件首次渲染時計算一次）
  const skeletonAspectRatio = useMemo(() => Math.random() * (2 - 0.5) + 0.5, []);

  return (
    <div className={`card card--artwork ${className || ''}`}>

      {/* 作品圖片 */}
      <div
        className="card__image"
        style={{ aspectRatio: image ? `${image.width} / ${image.height}` : skeletonAspectRatio }}
        suppressHydrationWarning
      >
        {image?.url ? (
          <Image
            data-webgl-media
            src={strapiImage(image.url)}
            alt={title || "Artwork"}
            fill
            placeholder="blur"
            blurDataURL={getBlurDataURL(image.url)}
            sizes="
              (min-width: 1400px) 500px,
              (min-width: 800px) 33vw,
              (min-width: 500px) 50vw,
              100vw
            "
            className={image.width > image.height ? 'landscape' : 'portrait'}
          />
        ) : (
          <Skeleton height="100%" />
        )}
      </div>

      {/* 卡片內容 */}
      <div className="card__content">
        {/* 標題與書籤 */}
        <header className="card__content__header">
          <h3 className="card__content__header__title line-clamp-2">
            {title || <Skeleton width="75%" />}
          </h3>
          {data && (
            <span
              onClick={handleToggleCollect}
              className={`card__content__header__bookmark material-symbols-outlined ${mdDown ? "" : 'size--24'} ${documentId && isCollected(documentId) ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={documentId && isCollected(documentId) ? "移除收藏" : "加入收藏"}
            >
              bookmark
            </span>
          )}
        </header>

        {/* 藝術家與年份 */}
        <div className="card__content__footer">
          {artists && artists.length > 0 ? (
            <>
              {artists.map((artist, index) => (
                <Fragment key={index}>
                  {artist.documentId ? (
                    <Link
                      href={`/artists/${artist.documentId}`}
                      className="card__content__footer__artist hover-underline link link--primary"
                    >
                      {artist.name}
                    </Link>
                  ) : (
                    <span className="card__content__footer__artist text-primary">
                      {artist.name}
                    </span>
                  )}
                  {index < artists.length - 1 && <span>, </span>}
                </Fragment>
              ))}
              {(yearFinish || yearCreate) && <span>・</span>}
            </>
          ) : (
            !data && <Skeleton width={60} />
          )}
          {(yearFinish || yearCreate) ? (
            <span className="card__content__footer__year">{yearFinish || yearCreate}</span>
          ) : (
            !data && <Skeleton className="ms-1" width={40} />
          )}
        </div>
      </div>

      {/* 背景可點擊區域 */}
      {documentId && <Link href={`/artworks/${documentId}`} className="card__click-area" />}
    </div>
  );
};

// 使用 React.memo 避免不必要的 re-render
// 注意：不能使用自訂比較函式，因為需要在 CollectionsContext 更新時 re-render
// （例如：初始化時獲取收藏列表後，書籤需要變成 active 狀態）
export const ArtworkCard = memo(ArtworkCardComponent);
