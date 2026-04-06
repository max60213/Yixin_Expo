import { InfoCard } from './InfoCard';
import { InfoNote } from './InfoNote';

// ==================== 時間卡片（Opening Hours）====================
// 支援五種變種：
// 1. Default - 一般營業時間（單日/多日）
// 2. With Note - 營業時間 + 注意事項
// 3. Open All Year - 全年無休
// 4. Multiple Hours - 多組營業時間（含公休日）
// 5. Open All Year + Note - 全年無休 + 注意事項
interface OpeningHour {
  day: string;
  time: string;
}

interface TimeCardProps {
  openingHours?: OpeningHour[];
  note?: string;
  isOpenAllYear?: boolean; // 全年無休
}

export const TimeCard = ({ openingHours, note, isOpenAllYear = false }: TimeCardProps) => {
  return (
    <InfoCard title="時間" variant="time">
      {/* 變種 1: 全年無休 */}
      {isOpenAllYear ? (
        <span className="info-card__text">全年無休</span>
      ) : (
        /* 變種 2-4: 顯示營業時間列表 */
        openingHours && openingHours.length > 0 && (
          <div className="info-card__hours">
            {openingHours.map((hour, index) => (
              <div key={index} className="info-card__hour-row">
                <span className="info-card__text">{hour.day}</span>
                {/* 公休日使用 medium 字重 */}
                <span className={hour.time === "公休" ? "info-card__text" : "info-card__text"}>
                  {hour.time}
                </span>
              </div>
            ))}
          </div>
        )
      )}
      
      {/* 注意事項（可與任何變種組合） */}
      <InfoNote note={note} />
    </InfoCard>
  );
};

