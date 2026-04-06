/**
 * CollectionGrid - 通用 Grid 渲染元件
 * 
 * 用於渲染非 artwork 類型的內容（如 materials, artists, galleries, events）
 */

import { getCardComponent } from '@/app/lib/cardFactory';
import './collection-page.css';

interface CollectionGridProps {
  category: string;
  fetchData: () => Promise<any[]>;
  emptyMessage?: string;
}

const CollectionGrid = async ({
  category,
  fetchData,
  emptyMessage = '沒有資料',
}: CollectionGridProps) => {
  const items = await fetchData();
  const CardComponent = getCardComponent(category);

  return (
    <div className="collection__content">
      {items.length > 0 ? (
        items.map((item: any) => (
          <CardComponent key={item.id || item.documentId} data={item} />
        ))
      ) : (
        <div className="collection__empty">{emptyMessage}</div>
      )}
    </div>
  );
};

export default CollectionGrid;