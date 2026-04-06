/**
 * Artwork 型別定義
 */

import type { StrapiImage, Dimension } from './common';
import { STRAPI_IMAGE_QUERY } from './common';
import type { ArtistListItem } from './artist';
// import type { Series } from './series';
import type { Gallery } from './gallery';
import type { Event } from './event';
import type { MaterialListItem } from './material';
import type { Provenance } from './provenance';
import type { Insight } from './insight';

// ========== STRAPI ARTWORK TYPE（Strapi v5 完整型別） ==========

export interface Artwork {
  id: number;
  documentId: string;
  title: string;
  state: 'draft' | 'verified' | 'verified-gold' | 'chained' | 'chained-gold';
  scannedImage: StrapiImage | null;
  additionalImages: StrapiImage[] | null;
  materials?: MaterialListItem[];
  about: any | null; // Strapi blocks type
  dimension: Dimension | null;
  framedDimension: Dimension | null;
  yearCreate: string | null;  // ⚠️ 實際是字串，不是數字
  yearFinish: string | null;  // ⚠️ 實際是字串，不是數字
  artists?: ArtistListItem[];
  // series?: Series;
  ownership: 'Gallery 畫廊' | 'Artist 畫家' | 'Individual 個人';
  ownedByGallery?: Gallery;
  price: string | null;  // ⚠️ 實際是字串，不是數字
  events?: Event[];
  provenances?: Provenance[];
  insights?: Insight[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: any[];  // 多語系版本
}

// ========== DOMAIN TYPES（前端分層資料格式） ==========

// 作品列表項目（用於 ArtworkCard）
export interface ArtworkListItem {
  id: number;
  documentId: string;
  title: string;
  yearFinish?: string | null;
  yearCreate?: string | null;
  artists?: ArtistListItem[];
  scannedImage?: StrapiImage | null;
}

export const mapArtworkListItem = (raw: ArtworkListItem): ArtworkListItem => ({
  id: raw.id,
  documentId: raw.documentId,
  title: raw.title,
  yearFinish: raw.yearFinish,
  yearCreate: raw.yearCreate,
  artists: raw.artists,
  scannedImage: raw.scannedImage,
});

export const ARTWORK_LIST_QUERY = {
  fields: ["documentId", "title", "yearFinish", "yearCreate"],
  populate: {
    scannedImage: STRAPI_IMAGE_QUERY,
    artists: {
      fields: ['name', 'documentId']
    },
    rank: true,
  },
  // 排序邏輯：優先使用 rank.globalScore，如果為 null 則使用 rank.randomScore
  // Strapi V5 支援多層級排序，null 值會自動排到後面
  sort: ['rank.globalScore:desc', 'rank.randomScore:desc', 'publishedAt:desc'],
  filters: {
    publishedAt: {
      $notNull: true
    }
  },
  // pagination 由各 page 層級指定
};

export interface ArtworkDetail {
  id: number;
  documentId: string;
  title: string;
  artists?: ArtistListItem[];
  state?: 'draft' | 'verified' | 'verified-gold' | 'chained' | 'chained-gold';
  yearCreate?: string | null;
  yearFinish?: string | null;
  price?: string | null;
  about?: any | null;
  // 圖片
  scannedImage?: StrapiImage | null;
  additionalImages?: StrapiImage[] | null;
  // 尺寸
  dimension?: Dimension | null;
  framedDimension?: Dimension | null;
  // 材質
  materials?: MaterialListItem[];
  // 擁有者
  ownership?: 'Gallery 畫廊' | 'Artist 畫家' | 'Individual 個人';
  ownedByGallery?: Gallery;
  // 來源紀錄
  provenances?: Provenance[];
  // 系列
  // series?: Series;
}

export const mapArtworkDetail = (raw: Artwork): ArtworkDetail => {
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title,
    artists: raw.artists,
    state: raw.state,
    yearCreate: raw.yearCreate,
    yearFinish: raw.yearFinish,
    price: raw.price,
    about: raw.about,
    scannedImage: raw.scannedImage,
    additionalImages: raw.additionalImages,
    dimension: raw.dimension,
    framedDimension: raw.framedDimension,
    materials: raw.materials,
    ownership: raw.ownership,
    ownedByGallery: raw.ownedByGallery,
    provenances: raw.provenances,
    // series: raw.series,
  };
}

export const ARTWORK_DETAIL_QUERY = {
  populate: {
    scannedImage: STRAPI_IMAGE_QUERY,
    additionalImages: STRAPI_IMAGE_QUERY,
    artists: {
      fields: ['name', 'documentId']
    },
    materials: {
      fields: ['name']
    },
    dimension: true,
    framedDimension: true,
    // series: {
    //   fields: ['title', 'documentId']
    // },
    ownedByGallery: {
      fields: ['name', 'documentId']
    },
    provenances: {
      populate: {
        related_event: {
          fields: ['title', 'documentId']
        },
        blockchainInfo: true
      },
      sort: ['timestamp:desc']
    }
  }
} as const;

