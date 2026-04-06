'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// ==================== Types ====================

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface UseInfiniteScrollOptions<T> {
  /** React Query 的 queryKey，用於快取識別 */
  queryKey: string[];
  /** 獲取資料的函數，接收頁碼，回傳標準的 Strapi 分頁格式 */
  fetchFn: (page: number) => Promise<PaginatedResponse<T>>;
  /** SSR 預取的初始資料 */
  initialData?: PaginatedResponse<T>;
  /** 觸發載入的距離（預設 500px） */
  threshold?: number;
}

// ==================== Hook ====================

export function useInfiniteScroll<T>({
  queryKey,
  fetchFn,
  initialData,
  threshold = 500,
}: UseInfiniteScrollOptions<T>) {
  const { ref: sentinelRef, inView } = useInView({ rootMargin: `${threshold}px` });

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const response = await fetchFn(pageParam);
      const pagination = response.meta?.pagination;
      const hasMore = pagination ? pagination.page < pagination.pageCount : false;
      return { data: response.data, hasMore };
    },
    initialPageParam: initialData?.meta?.pagination?.page ?? 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialData: initialData
      ? {
        pages: [
          {
            data: initialData.data,
            hasMore: initialData.meta?.pagination
              ? initialData.meta.pagination.page < initialData.meta.pagination.pageCount
              : false,
          },
        ],
        pageParams: [initialData.meta?.pagination?.page ?? 1],
      }
      : undefined,
  });

  // 當哨兵元素進入視窗時自動載入下一頁
  useEffect(() => {
    if (inView && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [inView, query.hasNextPage, query.isFetchingNextPage, query]);

  // 扁平化所有頁面的資料
  const items = query.data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = query.hasNextPage ?? false;

  return {
    items,
    sentinelRef,
    hasMore,
    isLoading: query.isPending,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
  };
}
