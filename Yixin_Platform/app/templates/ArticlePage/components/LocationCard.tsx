import { InfoCard } from './InfoCard';
import { InfoNote } from './InfoNote';

// ==================== 地點卡片（Location）====================
// 支援三種變種：
// 1. Default - 只顯示地點文字
// 2. HasGuid - 顯示導覽圖按鈕
// 3. HasMap - 顯示地圖按鈕
// 4. HasGuid + HasMap - 同時顯示兩個按鈕
interface LocationCardProps {
  location: string;
  hasGuidMap?: boolean;
  hasMap?: boolean;
  note?: string; // 注意事項
}

export const LocationCard = ({ location, hasGuidMap = false, hasMap = false, note }: LocationCardProps) => {
  return (
    <InfoCard title="地點" variant="location">
      <p className="info-card__text">{location}</p>

      {/* 注意事項（在按鈕上面） */}
      <InfoNote note={note} />

      {/* 按鈕區：根據 props 動態顯示 */}
      {(hasGuidMap || hasMap) && (
        <div className="info-card__actions !hidden">
          {/* 導覽圖按鈕 */}
          {hasGuidMap && (
            <button className="info-card__button button">
              <span className="material-symbols-rounded">map</span>
              <p>導覽圖</p>
            </button>
          )}

          {/* 地圖按鈕 */}
          {hasMap && (
            <button className="info-card__button button">
              <span className="material-symbols-rounded">location_on</span>
              <p>地圖</p>
            </button>
          )}
        </div>
      )}
    </InfoCard>
  );
};

