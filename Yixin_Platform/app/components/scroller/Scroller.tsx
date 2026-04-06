import './scroller.css';
import { ScrollerControls } from './ScrollerControls';
import { getCardComponent } from '@/app/lib/cardFactory';
import SectionHeader from '../SectionHeader';

interface ScrollerProps {
  className?: string;
  id?: string;
  /** 卡片類型 */
  category: string;
  /** Section 標題 */
  title?: string;
  /** 限制顯示數量 */
  limit?: number;
  /** 是否為 loading 狀態（用於 Suspense fallback） */
  loading?: boolean;
  /** skeleton 卡片數量（預設 5） */
  skeletonCount?: number;
  /** 資料陣列 */
  data?: unknown[];
  /** 自訂 SectionHeader 的連結目標（預設為 `/${category}`） */
  href?: string;
}

/**
 * Scroller 組件
 * 
 * 使用方式:
 * - `<Scroller category="events" data={events} title="活動" />` - ✅ 推薦
 * - `<Scroller category="events" loading />` - 用於 Suspense fallback
 */
const Scroller = ({
  className,
  id,
  category,
  title,
  limit,
  loading = false,
  skeletonCount = 5,
  data,
  href: hrefProp,
}: ScrollerProps) => {
  const href = hrefProp ?? `/${category}`;

  // 使用 category 作為唯一 ID，確保多個 Scroller 不會衝突
  const containerId = `scroller-${category}`;

  // 使用工廠模式獲取對應的組件
  const CardComponent = getCardComponent(category);

  // Loading 狀態:使用卡片組件本身的 skeleton 模式
  if (loading) {
    return (
      <div className={`scroller relative ${className || ''}`} id={id}>
        <SectionHeader
          title={title || category.charAt(0).toUpperCase() + category.slice(1)}
          href={href}
        />
        <div id={containerId} className={`scroller__container ${category}`}>
          {/* 渲染沒有 data 的卡片,讓卡片自己顯示 skeleton */}
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <CardComponent key={i} />
          ))}
        </div>
      </div>
    );
  }

  // 如果沒有數據且不是 loading 狀態,不渲染
  if (!data || data.length === 0) {
    console.warn(`No data available for category: ${category}`);
    return null;
  }

  // 如果設置了 limit，則限制數據數量
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className={`scroller relative ${className || ''} anchor`} id={id}>
      {limitedData.length > 0 && (
        <SectionHeader
          title={title || category.charAt(0).toUpperCase() + category.slice(1)}
          href={href}
        />
      )}
      <div
        id={containerId}
        className={`scroller__container ${category}`}
      >
        {limitedData.map((item: any, index) => (
          <CardComponent
            key={item.id || index}
            data={item}
          />
        ))}
      </div>
      <ScrollerControls containerId={containerId} />
    </div>
  );
};

export default Scroller;