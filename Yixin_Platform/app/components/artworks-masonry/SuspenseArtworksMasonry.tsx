/**
 * SuspenseArtworksMasonry - 支援 Suspense 的作品瀑布流元件
 * 
 * 用於需要異步載入作品列表的地方，配合 Suspense boundary 使用
 * 使用場景：首頁、分類頁、活動頁等
 */

import ArtworksMasonry from './ArtworksMasonry';
import { StrapiResponse, ArtworkListItem } from '@/app/lib/model';

interface SuspenseArtworksMasonryProps {
  fetchData: () => Promise<StrapiResponse<ArtworkListItem>>;
  baseQuery?: Record<string, any>;
  pageSize?: number;
}

export const SuspenseArtworksMasonry = async ({
  fetchData,
  baseQuery,
  pageSize = 30,
}: SuspenseArtworksMasonryProps) => {
  const response = await fetchData();
  return <ArtworksMasonry initialData={response} pageSize={pageSize} baseQuery={baseQuery} />;
};
