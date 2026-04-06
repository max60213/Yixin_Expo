import Skeleton from "react-loading-skeleton";

const formatStatus = (state?: string) => {
  switch (state) {
    case 'draft': return '草稿';
    case 'verified': return '已驗證';
    case 'verified-gold': return '已驗證 (金級)';
    case 'chained': return '已上鏈';
    case 'chained-gold': return '已上鏈 (金級)';
    default: return '已認證';
  }
};

interface VerifyStatusProps {
  state?: string;
  loading?: boolean;
}

const VerifyStatus = ({ state, loading }: VerifyStatusProps) => {
  return (
    <div className="artwork-header__status">
      <span className="artwork-header__status__icon material-symbols-sharp">
        verified
      </span>
      <span>{loading ? <Skeleton width={60} /> : formatStatus(state)}</span>
    </div>
  );
};

export default VerifyStatus;
