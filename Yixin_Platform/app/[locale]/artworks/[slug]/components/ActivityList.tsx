"use client";

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import ActivityItem from './ActivityItem';

interface ActivityRecord {
  id: number;
  title: string;
  date: string;
  time: string;
  icon: string;
  expanded: boolean;
  blockchain?: {
    block: string;
    transaction: string;
    commitment: string;
    note: string;
  };
}

interface ActivityListProps {
  records: ActivityRecord[];
  slug: string;
}

export const ActivityList = ({ records, slug }: ActivityListProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(records.length > 0 ? records[0].id : null);

  if (records.length === 0) {
    return <p className="text-text-secondary">暫無近期紀錄</p>;
  }

  return (
    <>
      {/* 近期紀錄列表 */}
      {records.map((record, index) => (
        index < 3 && (
          <ActivityItem
            className={index === 2 ? "peak" : ""}
            key={record.id}
            id={record.id}
            title={record.title}
            date={record.date}
            time={record.time}
            icon={record.icon}
            expanded={expandedId === record.id}
            blockchain={record.blockchain}
            onToggle={() => {
              setExpandedId(expandedId === record.id ? null : record.id);
            }}
          />
        )
      ))}
      {records.length >= 3 && (
        <Link href={`${slug}/activities`} className="artwork-page__info__activities__items__more">
          <span>查看完整紀錄</span>
        </Link>
      )}
    </>
  );
};


