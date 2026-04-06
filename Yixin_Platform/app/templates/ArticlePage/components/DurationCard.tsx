import { InfoCard } from './InfoCard';
import { InfoNote } from './InfoNote';

// ==================== 展期卡片（Duration / On View）====================
// 支援三種變種：multi-day（多日展期）、single-day（單日活動）、permanent（常設展）
type DurationCardType = 'multi-day' | 'single-day' | 'permanent';

interface DurationCardProps {
  type?: DurationCardType;
  startDate: string;
  endDate?: string;
  weekday?: string; // 用於 single-day 顯示星期
  note?: string; // 注意事項
}

export const DurationCard = ({ type = 'multi-day', startDate, endDate, weekday, note }: DurationCardProps) => {
  return (
    <InfoCard title="展期" variant="duration">
      {/* 多日展期：顯示開始與結束日期 */}
      {type === 'multi-day' && endDate && (
        <>
          <span className="info-card__text">{startDate}</span>
          <span className="info-card__text">~</span>
          <span className="info-card__text">{endDate}</span>
        </>
      )}

      {/* 單日活動：顯示日期與星期 */}
      {type === 'single-day' && weekday && (
        <>
          <span className="info-card__text">{startDate}</span>
          <span className="info-card__text">{weekday}</span>
        </>
      )}

      {/* 常設展：顯示開始日期 */}
      {type === 'permanent' && (
        <>
          <span className="info-card__text">常設展・自</span>
          <span className="info-card__text">{startDate}</span>
          <span className="info-card__text">起</span>
        </>
      )}

      {/* 注意事項 */}
      <InfoNote note={note} />
    </InfoCard>
  );
};

