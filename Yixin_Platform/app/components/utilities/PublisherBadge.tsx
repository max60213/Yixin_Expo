/**
 * PublisherBadge - 發布者/畫廊標籤元件
 * 
 * 用於顯示畫廊名稱的可點擊標籤
 */

import { Link } from "@/i18n/navigation";
import "./publisher-badge.css";

export interface GalleryInfo {
  documentId: string;
  name: string;
}

interface PublisherBadgeProps {
  /** Gallery 資料 */
  gallery: GalleryInfo;
  /** 額外的 className */
  className?: string;
}

/**
 * PublisherBadge
 */
export const PublisherBadge = ({ gallery, className = "" }: PublisherBadgeProps) => (
  <Link
    key={gallery.documentId}
    href={`/galleries/${gallery.documentId}`}
    className={`publisher-badge ${className}`}
  >
    {gallery.name}
  </Link>
);
