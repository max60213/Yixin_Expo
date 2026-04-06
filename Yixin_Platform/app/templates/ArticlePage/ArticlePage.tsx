import "./article.css";
import Image from "next/image";
import { ReactNode } from "react";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { PublisherBadge } from "@/app/components/utilities/PublisherBadge";
import { strapiImage, getBlurDataURL } from "@/app/lib/strapi/strapiImage";
import type { GalleryListItem } from "@/lib/model/gallery";
import type { StrapiImage } from "@/app/lib/model/common";

interface ArticlePageProps {
  title: string;
  cover: StrapiImage | null;
  publishDate: string;
  galleries: GalleryListItem[];
  content: BlocksContent | null;
  tags?: string[];
  sidePanel?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const PLACEHOLDER_COVER = '/placeholder-cover.png';

export default function ArticlePage({
  title,
  cover,
  publishDate,
  galleries,
  content,
  tags = [],
  sidePanel,
  children,
  className = "",
}: ArticlePageProps) {
  const imageSrc = cover?.url ? strapiImage(cover.url) : PLACEHOLDER_COVER;

  return (
    <div className="page-transition page-transition--article">
      <article className={`article ${className}`}>
        <div className="article__top">
          <div className="article__top__featured-image">
            <Image
              src={imageSrc}
              alt={cover?.alternativeText || title}
              fill
              sizes="(min-width: 1800px) 2000px, 100vw"
              placeholder="blur"
              blurDataURL={getBlurDataURL(imageSrc)}
              className="article__top__featured-image__image"
            />
          </div>
        </div>

        <main className="article__content mb-12">
          <div className="article__content__main">
            <header className="article__content__main__header">
              <div className="article__content__main__header__meta">
                {galleries.length > 0 &&
                  galleries.map((gallery) => (
                    <PublisherBadge key={gallery.documentId} gallery={gallery} />
                  ))}
                <span className="article__content__main__header__meta__date">{publishDate}</span>
              </div>
              <h1 className="article__content__main__header__title">{title}</h1>
              {tags.length > 0 && (
                <div className="article__content__main__header__tags">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </header>

            <div className="article__content__main__description block-renderer">
              {content ? (
                <BlocksRenderer content={content} />
              ) : (
                <p>暫無內容</p>
              )}
            </div>
          </div>

          {sidePanel && (
            <aside className="article__content__info">
              {sidePanel}
            </aside>
          )}
        </main>
      </article>
      {children}
    </div>
  );
}
