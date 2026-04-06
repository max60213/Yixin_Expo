import './owner.css';

interface OwnerProps {
  address: string;        // 錢包地址
  name?: string;          // 可選的顯示名稱（ENS 或平台暱稱）
  acquiredAt: string;     // 取得時間 (ISO 格式)
  txHash?: string;        // 交易雜湊（可選）
  isCurrent?: boolean;
  className?: string;
}

/**
 * 格式化日期為易讀格式
 */
const formatDate = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return isoDate;
  }
};

const Owner = ({
  address,
  name,
  acquiredAt,
  txHash,
  isCurrent = false,
  className = ''
}: OwnerProps) => {
  return (
    <div className={`owner ${isCurrent ? 'owner--current' : ''} ${className}`}>
      <div className="owner__identity">
        {name ? (
          <>
            <h3 className="owner__name">{name}</h3>
            <p className="owner__address">{address}</p>
          </>
        ) : (
          <h3 className="owner__name owner__name--address">{address}</h3>
        )}
      </div>
      <div className="owner__meta">
        <p className="owner__acquired">
          <span className="owner__date">{formatDate(acquiredAt)}</span>
        </p>
        {txHash && (
          <p className="owner__tx">
            <span className="owner__label">Tx : </span>
            <span className="owner__hash link link--primary">{txHash}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Owner;