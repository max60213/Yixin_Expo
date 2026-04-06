import Link from 'next/link';
import './detail-row.css';

export interface LinkItem {
  name: string;
  href?: string;
}

interface DetailRowProps {
  label: string;
  /** 連結項目陣列 */
  items: LinkItem[];
}

/**
 * DetailRow 組件
 * 
 * 使用方式：
 * <DetailRow label="媒材" items={[{ name: "油畫", href: "/..." }]} />
 * <DetailRow label="尺寸" items={[{ name: "50 x 60 cm" }]} />
 */
const DetailRow = ({ label, items }: DetailRowProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="detail-row">
      <span className="detail-row__label">{label}</span>
      <span className="detail-row__value">
        {items.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link href={item.href} className="link link--primary">
                {item.name}
              </Link>
            ) : (
              item.name
            )}
            {index < items.length - 1 && ', '}
          </span>
        ))}
      </span>
    </div>
  );
};

export default DetailRow;
