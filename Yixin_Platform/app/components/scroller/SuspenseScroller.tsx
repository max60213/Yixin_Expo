/**
 * SuspenseScroller - 帶 Suspense 的 Scroller
 * 
 * 自動處理 async 資料獲取和 loading skeleton
 * 只能在 Server Components 中使用
 * 
 * @example
 * <SuspenseScroller
 *   category="artworks"
 *   title="館藏"
 *   fetcher={() => fetchGalleryArtworks(slug)}
 * />
 */

import { Suspense } from 'react';
import Scroller from './Scroller';
import type { CardCategory } from '@/lib/cardFactory';

export interface SuspenseScrollerProps {
  /** Section ID（用於 anchor 跳轉） */
  id?: string;
  /** 卡片類型 (用於 skeleton 和工廠) */
  category: CardCategory;
  /** Section 標題 */
  title: string;
  /** 資料獲取函數，返回資料陣列或 null */
  fetcher: () => Promise<unknown[] | null>;
  /** skeleton 卡片數量（預設 5） */
  skeletonCount?: number;
  /** 額外的 className */
  className?: string;
  /** 限制顯示數量 */
  limit?: number;
  /** 自訂 SectionHeader 的連結目標（預設為 `/${category}`） */
  href?: string;
  clean?: boolean; // 無 fallback 模式
}

/**
 * 內部 async component - 執行資料獲取
 */
async function AsyncScrollerContent({
  id,
  category,
  title,
  fetcher,
  className,
  limit,
  href,
}: SuspenseScrollerProps) {
  const data = await fetcher();
  if (!data || data.length === 0) return null;
  return (
    <div id={id} className="anchor">
      <Scroller
        category={category}
        title={title}
        limit={limit}
        className={className}
        href={href}
        data={data}
      />
    </div>
  );
}

/**
 * SuspenseScroller - 帶自動 Suspense 的 Scroller
 * 
 * 特點：
 * - 自動包裝 Suspense
 * - 自動顯示 skeleton fallback
 * - 各 SuspenseScroller 獨立載入，互不阻塞
 */
export function SuspenseScroller({
  id,
  category,
  title,
  fetcher,
  skeletonCount = 5,
  className,
  limit,
  href,
  clean = false
}: SuspenseScrollerProps) {
  return (
    <Suspense
      fallback={clean ? null : (
        <div id={id} className="anchor">
          <Scroller
            category={category}
            title={title}
            loading
            skeletonCount={skeletonCount}
            className={className}
            href={href}
          />
        </div>
      )}
    >
      <AsyncScrollerContent
        id={id}
        category={category}
        title={title}
        fetcher={fetcher}
        className={className}
        limit={limit}
        href={href}
      />
    </Suspense>
  );
}

export default SuspenseScroller;
