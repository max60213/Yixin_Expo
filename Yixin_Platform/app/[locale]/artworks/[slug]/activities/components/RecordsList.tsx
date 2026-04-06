"use client";

import { useState } from "react";
import ActivityItem from "../../components/ActivityItem";

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

interface RecordsListProps {
  records: ActivityRecord[];
}

const RecordsList = ({ records }: RecordsListProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(
    records.length > 0 ? records[0].id : null
  );

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="activities__list">
      {records.map((record) => (
        <ActivityItem
          key={record.id}
          id={record.id}
          title={record.title}
          date={record.date}
          time={record.time}
          icon={record.icon}
          expanded={expandedId === record.id}
          blockchain={record.blockchain}
          onToggle={() => handleToggle(record.id)}
        />
      ))}
    </div>
  );
};

export default RecordsList;
