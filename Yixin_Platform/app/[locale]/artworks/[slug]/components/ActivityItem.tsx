"use client";

import './activity-item.css';
import BlockchainItem from './BlockchainItem';

interface BlockchainInfo {
  block: string;
  transaction: string;
  commitment: string;
  note: string;
}

interface ActivityItemProps {
  className?: string;
  id: number;
  title: string;
  date: string;
  time: string;
  icon?: string;
  expanded: boolean;
  blockchain?: BlockchainInfo;
  onToggle: () => void;
}

const ActivityItem = ({ className, title, date, time, icon, expanded, blockchain, onToggle }: ActivityItemProps) => {
  const handleToggle = () => {
    if (blockchain) {
      onToggle();
    }
  };

  return (
    <div className={`activity-item ${expanded ? 'activity-item--expanded' : ''} ${className ? className : ''}`}>
      <div className="activity-item__header" onClick={handleToggle}>
        <div className="activity-item__header__left">
          <span className="material-symbols-rounded">{icon || 'more_horiz'}</span>
          <div className="activity-item__header__info">
            <span className="activity-item__title">{title}</span>
            <div className="activity-item__date">
              <span>{date}</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
        {blockchain && (
          <span className="activity-item__arrow material-symbols-rounded">
            arrow_back_ios_new
          </span>
        )}
      </div>

      {blockchain && (
        <div className="activity-item__content-wrapper">
          <div className="activity-item__content">
            <div className="activity-item__blockchain">
              <div className="activity-item__blockchain__items">
                <BlockchainItem label="區塊" value={blockchain.block} />
                <BlockchainItem label="交易" value={blockchain.transaction} />
                <BlockchainItem label="Commitment (Root)" value={blockchain.commitment} />
              </div>
              <p className="activity-item__blockchain__note">{blockchain.note}</p>
              <a className="activity-item__blockchain__link link link--secondary activity-item__blockchain__link" target="_blank" href="https://sepolia.etherscan.io/tx/0xce6cd0bbbd204b200280ebc9a31ee27b8db498e0dfb5c2205f7f113869714de3">
                <span>在區塊鏈上查看</span>
                <span className="material-symbols-rounded">call_made</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;

