/**
 * Featured 型別定義
 * 
 * 用於首頁輪播/精選內容
 * type 決定顯示的是 event 還是 insight
 */

import type { EventListItem } from './event';
import type { InsightListItem } from './insight';
import { EVENT_LIST_QUERY } from './event';
import { INSIGHT_LIST_QUERY } from './insight';

// ========== 類型定義 ==========

export type FeaturedType = 'event' | 'insight';

// ========== STRAPI FEATURED TYPE（完整型別）==========

export interface Featured {
  id: number;
  documentId: string;
  title: string;
  type: FeaturedType;
  event?: EventListItem | null;
  insight?: InsightListItem | null;
  startDate: string | null;
  endDate: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  localizations: any[];
}

// ========== LIST ITEM（用於輪播/列表）==========

export interface FeaturedListItem {
  id: number;
  documentId: string;
  title: string;
  type: FeaturedType;
  event: EventListItem | null;
  insight: InsightListItem | null;
  startDate: string | null;
  endDate: string | null;
}

/**
 * 將 Strapi Featured 轉換為 FeaturedListItem
 */
export function mapFeaturedListItem(raw: any): FeaturedListItem {
  return {
    id: raw.id,
    documentId: raw.documentId,
    title: raw.title,
    type: raw.type,
    event: raw.event || null,
    insight: raw.insight || null,
    startDate: raw.startDate || null,
    endDate: raw.endDate || null,
  };
}

// ========== QUERY CONFIG（定義需要 fetch 的欄位）==========

export const FEATURED_LIST_QUERY = {
  fields: ['title', 'type', 'startDate', 'endDate', 'publishedAt'],
  populate: {
    event: {
      fields: EVENT_LIST_QUERY.fields,
      populate: EVENT_LIST_QUERY.populate,
    },
    insight: {
      fields: INSIGHT_LIST_QUERY.fields,
      populate: INSIGHT_LIST_QUERY.populate,
    },
  },
  sort: ['publishedAt:desc'],
};

// ========== HELPER FUNCTIONS ==========

/**
 * 檢查 Featured 項目是否在有效期內
 */
export function isFeaturedActive(item: FeaturedListItem): boolean {
  const now = new Date();

  if (item.startDate && new Date(item.startDate) > now) {
    return false; // 尚未開始
  }

  if (item.endDate && new Date(item.endDate) < now) {
    return false; // 已結束
  }

  return true;
}

/**
 * 根據 type 取得對應的內容
 */
export function getFeaturedContent(item: FeaturedListItem): EventListItem | InsightListItem | null {
  if (item.type === 'event') {
    return item.event;
  }
  if (item.type === 'insight') {
    return item.insight;
  }
  return null;
}
