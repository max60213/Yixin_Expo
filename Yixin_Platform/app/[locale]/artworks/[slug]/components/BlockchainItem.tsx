"use client";

import './blockchain-item.css';

interface BlockchainItemProps {
  label: string;
  value: string;
  href?: string;
}

const BlockchainItem = ({ label, value, href }: BlockchainItemProps) => {
  return (
    <div className="blockchain-item">
      <span className="blockchain-item__label">{label}</span>
      {href ?
        <a className="blockchain-item__value link link--primary" href={href} target="_blank" rel="noopener noreferrer">{value}</a>
        :
        <span className="blockchain-item__value">{value}</span>
      }
    </div>
  );
};

export default BlockchainItem;

