/**
 * Card Factory Pattern
 * 集中管理所有 Card 組件的創建和配置
 */

import { ComponentType } from 'react';
import { EventCard } from '@/components/content-card/EventCard';
import { ArtworkCard } from '@/components/content-card/ArtworkCard';
import { MaterialCard } from '@/components/content-card/MaterialCard';
import { ArtistCard } from '@/components/content-card/ArtistCard';
import { GalleryCard } from '@/components/content-card/GalleryCard';
import { InsightCard } from '@/components/content-card/InsightCard';

// ==================== 類型定義 ====================

/**
 * 所有可用的 Card 類型
 */
export type CardCategory = 'events' | 'artworks' | 'materials' | 'artists' | 'galleries' | 'insights';

/**
 * Card 組件的統一 Props 接口
 * data 為可選,當 data 為 undefined 時,卡片顯示 Skeleton
 */
export interface CardProps {
  data?: unknown;
  locale?: string;
  className?: string;
}

// ==================== Card 組件註冊表 ====================

/**
 * Card 組件註冊表
 * 直接 import 組件，確保圖片 blur placeholder 正常運作
 * 
 * @note 各個 Card 組件的 props 類型可能不一致
 * 使用 as unknown as ComponentType<CardProps> 進行類型轉換以統一接口
 */
const cardRegistry: Record<CardCategory, ComponentType<CardProps>> = {
  events: EventCard as unknown as ComponentType<CardProps>,
  artworks: ArtworkCard as unknown as ComponentType<CardProps>,
  materials: MaterialCard as unknown as ComponentType<CardProps>,
  artists: ArtistCard as unknown as ComponentType<CardProps>,
  galleries: GalleryCard as unknown as ComponentType<CardProps>,
  insights: InsightCard as unknown as ComponentType<CardProps>,
};

// ==================== 工廠函數 ====================

/**
 * 根據類型獲取對應的 Card 組件
 * @param category - Card 類型
 * @returns Card 組件，如果類型不存在則返回 EventCard 作為預設
 * 
 * @example
 * const CardComponent = getCardComponent('events');
 * <CardComponent data={eventData} />
 */
export function getCardComponent(category: string): ComponentType<CardProps> {
  const normalizedCategory = category.toLowerCase() as CardCategory;

  // 如果類型不存在，返回預設的 EventCard
  if (!hasCardComponent(normalizedCategory)) {
    console.warn(`Card type "${category}" not found. Using default (events).`);
    return cardRegistry.events;
  }

  return cardRegistry[normalizedCategory];
}

/**
 * 檢查某個類型是否有對應的 Card 組件
 * @param category - 要檢查的類型
 * @returns 是否存在對應的 Card
 * 
 * @example
 * if (hasCardComponent('events')) {
 *   // 可以安全使用 events Card
 * }
 */
export function hasCardComponent(category: string): category is CardCategory {
  return category in cardRegistry;
}

/**
 * 獲取所有可用的 Card 類型列表
 * @returns 所有已註冊的 Card 類型
 * 
 * @example
 * const types = getAvailableCardTypes();
 * // ['events', 'artworks', 'materials', 'artists']
 */
export function getAvailableCardTypes(): CardCategory[] {
  return Object.keys(cardRegistry) as CardCategory[];
}

/**
 * 批量獲取多個 Card 組件
 * @param categories - Card 類型數組
 * @returns Card 組件數組
 * 
 * @example
 * const cards = getCardComponents(['events', 'artworks']);
 * cards.forEach((Card, index) => <Card key={index} data={data[index]} />)
 */
export function getCardComponents(categories: string[]): ComponentType<CardProps>[] {
  return categories
    .map(category => getCardComponent(category))
    .filter(Boolean);
}

// ==================== 工具函數 ====================

/**
 * 驗證 category 是否為有效的 Card 類型
 * 提供更友好的錯誤提示
 * 
 * @param category - 要驗證的類型
 * @throws 如果類型無效則拋出錯誤
 */
export function validateCardCategory(category: string): asserts category is CardCategory {
  if (!hasCardComponent(category)) {
    const available = getAvailableCardTypes().join(', ');
    throw new Error(
      `Invalid card category: "${category}". Available types: ${available}`
    );
  }
}

