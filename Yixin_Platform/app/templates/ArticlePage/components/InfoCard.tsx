import "./info-card.css";
import { ReactNode } from "react";

// ==================== 基礎 InfoCard 組件 ====================
// 這是所有資訊卡片的基礎容器，包含卡片外框和標題
interface InfoCardProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'location' | 'price' | 'duration' | 'time';
  className?: string;
}

export const InfoCard = ({ title, children, variant = 'default', className = '' }: InfoCardProps) => {
  const variantClass = variant !== 'default' ? `info-card--${variant}` : '';
  const combinedClassName = `info-card ${variantClass} ${className}`.trim();
  
  return (
    <div className={`${combinedClassName} side-shadow`}>
      <h3 className="info-card__header">{title}</h3>
      <div className="info-card__content">
        {children}
      </div>
    </div>
  );
};
