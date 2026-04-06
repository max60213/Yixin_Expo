'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Masonry from 'react-smart-masonry';
import { StrapiResponse, ArtworkListItem } from "@/app/lib/model";
import { ArtworkCard } from "@/app/components/content-card/ArtworkCard";
import { ARTWORK_LIST_QUERY } from "@/app/lib/model/artwork";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";
import "./artworks-masonry.css";
import { BREAKPOINTS } from "@/app/lib/breakpoints";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useBreakpoints } from '@/app/hooks/useBreakpoints';

gsap.registerPlugin(ScrollTrigger);


// ========== 配置 ==========

const MASONRY_CONFIG = {
  breakpoints: {
    0: 0,
    sm: 700,
    md: BREAKPOINTS.md,
    lg: BREAKPOINTS.lg,
    xl: BREAKPOINTS.xl,
    '2xl': BREAKPOINTS['2xl'],
  },
  columns: { 0: 2, sm: 3, md: 3, lg: 4, xl: 4, '2xl': 5 },
} as const;

// ========== 類型 ==========

type ArtworkQuery = {
  fields?: readonly string[] | string[];
  populate?: Record<string, unknown>;
  sort?: readonly string[] | string[];
  filters?: Record<string, unknown>;
  pagination?: { page?: number; pageSize?: number };
};

interface ArtworksMasonryProps {
  initialData?: StrapiResponse<ArtworkListItem>;
  pageSize?: number;
  baseQuery?: ArtworkQuery;
  threshold?: number;
  skeletonCount?: number;
}

// ========== 主組件 ==========

const ArtworksMasonry = ({
  initialData,
  pageSize = 30,
  baseQuery = ARTWORK_LIST_QUERY,
  threshold = 1000,
  skeletonCount = 8,
}: ArtworksMasonryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { smDown } = useBreakpoints();
  const [isHydrated, setIsHydrated] = useState(false);

  // 確保在客戶端 hydration 後才執行 breakpoint 判斷
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // GSAP ScrollTrigger 動畫：marginLeft/marginRight 從 0 到 --grid-gap
  // 從視窗頂部 80% 開始，到視窗頂部 20% 結束
  // 只在 smDown (小螢幕) 且 hydration 完成後運作
  useGSAP(() => {
    if (!containerRef.current || !isHydrated || !smDown) return;
    console.log("smDown : ", smDown);

    const docStyle = getComputedStyle(document.documentElement);
    const gap = docStyle.getPropertyValue("--grid-gap");

    gsap.to(containerRef.current, {
      marginLeft: gap,
      marginRight: gap,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",  // 元素頂部到達視窗 2/3 位置時開始
        end: "top 20%",    // 元素頂部到達視窗 1/3 位置時結束
        scrub: true,       // 跟隨滾動平滑動畫
      }
    });
  }, { scope: containerRef, dependencies: [smDown, isHydrated] });

  // 使用 React Query 的 useInfiniteScroll hook
  const {
    items: artworks,
    sentinelRef,
    hasMore,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    fetchNextPage,
  } = useInfiniteScroll<ArtworkListItem>({
    queryKey: ['artworks', JSON.stringify(baseQuery)],
    fetchFn: async (page) => {
      // 使用 URLSearchParams 構建查詢字串，確保 API route 能正確解析
      const params = new URLSearchParams({
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
      });
      if (baseQuery.fields) params.append('fields', JSON.stringify(baseQuery.fields));
      if (baseQuery.populate) params.append('populate', JSON.stringify(baseQuery.populate));
      if (baseQuery.sort) params.append('sort', JSON.stringify(baseQuery.sort));
      if (baseQuery.filters) params.append('filters', JSON.stringify(baseQuery.filters));

      const queryString = params.toString();
      const res = await fetch(`/api/artworks?${queryString}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    initialData,
    threshold,
  });

  // Memoized renders
  const cards = useMemo(() =>
    artworks.map(item => (
      <div key={item.documentId} className="masonry__item">
        <ArtworkCard className="masonry__card" data={item} />
      </div>
    )), [artworks]);

  const skeletons = useMemo(() =>
    Array.from({ length: skeletonCount }, (_, i) => (
      <div key={i} className="masonry__item">
        <ArtworkCard className="masonry__card" />
      </div>
    )), [skeletonCount]);

  // Render helpers
  const renderMasonry = (children: React.ReactNode) => (
    <Masonry
      breakpoints={MASONRY_CONFIG.breakpoints}
      columns={MASONRY_CONFIG.columns}
      autoArrange
      className="masonry"
    >
      {children}
    </Masonry>
  );

  const renderStatus = () => {
    if (isFetchingNextPage) return (
      <div className="artworks-masonry__loading">
        <div className="artworks-masonry__loading__spinner">
          <div className="spinner" />
          <p>載入更多作品...</p>
        </div>
      </div>
    );

    if (isError) return (
      <div className="artworks-masonry__error">
        <p>{error?.message || '加載失敗'}</p>
        <button onClick={() => fetchNextPage()} className="btn btn--primary">重試</button>
      </div>
    );

    if (!hasMore && artworks.length > 0) return (
      <div className="artworks-masonry__end"><p>已載入全部作品</p></div>
    );

    if (!hasMore && artworks.length === 0) return (
      <div className="artworks-masonry__empty"><p>目前沒有作品</p></div>
    );

    return null;
  };

  // No initial data - show skeletons (initial loading)
  if (isLoading && artworks.length === 0) {
    return <div ref={containerRef} className="artworks-masonry">{renderMasonry(skeletons)}</div>;
  }

  return (
    <div ref={containerRef} className="artworks-masonry">
      {renderMasonry(cards)}
      {renderStatus()}
      <div ref={sentinelRef} style={{ height: 1, visibility: 'hidden' }} />
    </div>
  );
};

export default ArtworksMasonry;
