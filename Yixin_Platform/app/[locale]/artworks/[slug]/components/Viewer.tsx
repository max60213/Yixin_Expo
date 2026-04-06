"use client";

import Image from 'next/image';
import { useState } from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './viewer.css';

interface ViewerProps {
  images?: string[];
  className?: string;
  /** Loading 狀態（顯示 Skeleton） */
  loading?: boolean;
}

// 使用 picsum.photos 創建 10 張假數據圖片
const defaultImages = Array.from({ length: 10 }, (_, index) =>
  `https://picsum.photos/600/800?random=${index + 1}`
);

const Viewer = ({ images = defaultImages, className, loading }: ViewerProps) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  // Loading 狀態：顯示 Skeleton
  if (loading) {
    return (
      <div className={`viewer ${className || ''}`}>
        <div className="viewer__image">
          <Skeleton height="100%" width="100%" style={{ position: 'absolute', inset: 0 }} />
        </div>
      </div>
    );
  }

  // 判斷是否有多張圖片（大於 1 張才顯示縮圖列表）
  const hasMultipleImages = images.length > 1;

  return (
    <div className={`viewer ${className ? className : ''}`}>
      {/* 主要顯示圖片區域 */}
      <div className="viewer__image">
        <Image
          src={activeImage}
          alt="artwork image"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* 縮圖列表：只有在有多張圖片時才顯示 */}
      {hasMultipleImages && (
        <div className="viewer__thumbnails">
          {images.map((image, index) => (
            <div
              className="viewer__thumbnails__item"
              key={index}
              onMouseOver={() => setActiveImage(image)}
              style={{ cursor: 'pointer', opacity: activeImage === image ? 1 : 0.6 }}
            >
              <Image
                src={image}
                alt={`thumbnail ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Viewer;