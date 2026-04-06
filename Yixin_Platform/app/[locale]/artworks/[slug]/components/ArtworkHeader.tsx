"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useCollections } from "@/app/context/collectionsContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './artwork-header.css';
import { ArtistListItem } from "@/app/lib/model/artist";
import VerifyStatus from "./VerifyStatus";

interface ArtworkHeaderProps {
  documentId?: string;
  title?: string;
  artists?: ArtistListItem[] | null;
  year?: string;
  state?: string;
  /** Loading 狀態（顯示 Skeleton） */
  loading?: boolean;
}

const ArtworkHeader = ({ documentId, title, artists, year, state, loading }: ArtworkHeaderProps) => {
  const router = useRouter();
  const { isCollected, toggleCollect, isAuthenticated } = useCollections("artworks");

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

  const isLoading = loading || !title;

  return (
    <header className="artwork-header">
      <div className="artwork-header__title-wrapper">
        <h1 className="artwork-header__title">
          {isLoading ? <Skeleton width={200} /> : title}
        </h1>
        <span
          onClick={handleToggleCollect}
          className={`artwork-header__bookmark material-symbols-outlined ${documentId && isCollected(documentId) ? 'active' : ''}`}
          role="button"
          tabIndex={0}
          aria-label={documentId && isCollected(documentId) ? "移除收藏" : "加入收藏"}
        >
          bookmark
        </span>
      </div>
      <div className="artwork-header__meta">
        <div className="artwork-header__artist">
          {isLoading ? (
            <Skeleton width={120} />
          ) : (
            artists?.map((artist, index) => (
              artist.documentId ? (
                <Link href={`/artists/${artist.documentId}`} className="artwork-header__artist__name link link--primary"
                  key={index}
                >
                  {artist.name}
                </Link>
              ) : (
                <span className="artwork-header__artist__name text-primary" key={index}>{artist.name}</span>
              )
            ))
          )}
          <span className="text-text-tertiary">・</span>
          <span className="artwork-header__artist__year">
            {isLoading ? <Skeleton width={80} /> : year}
          </span>
        </div>
        <VerifyStatus state={state} loading={isLoading} />
      </div>
    </header>
  );
};

export default ArtworkHeader;

