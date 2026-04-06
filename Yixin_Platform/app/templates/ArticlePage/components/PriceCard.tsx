import { InfoCard } from './InfoCard';
import { InfoNote } from './InfoNote';

// ==================== 費用卡片（Price）====================
// 支援四種變種：
// 1. Free Entry - 自由入場
// 2. Two Items - 兩個票價項目
// 3. Three Items - 三個票價項目
// 4. With Note - 票價 + 注意事項
// 5. With Ticket Button - 票價 + 購票按鈕
interface Pricing {
  type: string;
  price: string;
}

interface PriceCardProps {
  isFree?: boolean; // 自由入場
  pricing?: Pricing[];
  priceNote?: string;
  hasTicketButton?: boolean;
}

export const PriceCard = ({ isFree = false, pricing, priceNote, hasTicketButton = false }: PriceCardProps) => {
  return (
    <InfoCard title="費用 (NTD)" variant="price">
      {/* 變種 1: 自由入場 */}
      {isFree ? (
        <span className="info-card__text">自由入場</span>
      ) : (
        /* 變種 2-3: 顯示票價列表 */
        pricing && pricing.length > 0 && (
          <div className="info-card__pricing">
            {pricing.map((price, index) => (
              <div key={index} className="info-card__price-row">
                <span className="info-card__text">{price.type}</span>
                {/* 免費項目使用 medium 字重 */}
                <span className={price.price === "免費" ? "info-card__text" : "info-card__text"}>
                  {price.price}
                </span>
              </div>
            ))}
          </div>
        )
      )}
      
      {/* 變種 4: 注意事項（在購票按鈕上面） */}
      <InfoNote note={priceNote} />
      
      {/* 變種 5: 購票按鈕 */}
      {hasTicketButton && (
        <button className="info-card__button button button--primary button--ticket">
          <span className="material-symbols-rounded">local_activity</span>
          <p>購票</p>
        </button>
      )}
    </InfoCard>
  );
};

