/**
 * Strapi 通用型別定義
 */

// ========== Strapi 回應結構 ==========

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

// ========== 通用元件 ==========

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Dimension {
  id: number;
  width: number;
  height: number;
  depth: number | null;
}

export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
}

export interface Member {
  id: number;
  name: string;
  role: string;
}

export interface BlockchainInfo {
  id: number;
  txHash: string | null;
  blockNumber: string | null;
  contractAddress: string | null;
  tokenId: string | null;
  chainId: string | null;
}

// ========== 標準 Query 配置 ==========

/**
 * 標準 StrapiImage 欄位查詢
 * 用於所有需要 populate image 的地方
 */
export const STRAPI_IMAGE_QUERY = {
  fields: ['url', 'alternativeText', 'width', 'height']
};