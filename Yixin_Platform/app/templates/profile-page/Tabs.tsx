"use client";

import { useState, useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./tabs.css";

export interface Tab {
  key: string;
  label: string;
  anchorId: string;
}

interface TabsProps {
  /** Tab 配置（必填，從頁面傳入） */
  tabs?: Tab[];
  /** Loading 模式 */
  loading?: boolean;
  /** 預設選中的 tab key */
  defaultActiveTab?: string;
  /** 額外的 className */
  className?: string;
  /** 左側標題（點擊回到頂部） */
  title?: string;
}

/**
 * Tabs 組件 (Client Component)
 * 
 * 保持 Client Component 因為需要：
 * - useState 管理 activeTab
 * - useEffect 監聽滾動更新 activeTab
 */
const Tabs = ({
  tabs = [],
  loading = false,
  defaultActiveTab,
  className = "",
  title
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.key || "");

  // 根據傳入的 tabs 動態建立 anchor 映射
  const { anchors, anchorToTab } = useMemo(() => {
    const anchors = tabs.map(t => t.anchorId);
    const anchorToTab = Object.fromEntries(tabs.map(t => [t.anchorId, t.key]));
    return { anchors, anchorToTab };
  }, [tabs]);

  // 監聽滾動，自動更新 activeTab
  useEffect(() => {
    if (loading || tabs.length === 0) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY + 100; // 考慮 sticky tabs 高度

      // 從下往上找第一個超過視窗頂部的 anchor
      for (let i = anchors.length - 1; i >= 0; i--) {
        const element = document.getElementById(anchors[i]);
        if (element && element.offsetTop <= scrollTop) {
          const tabKey = anchorToTab[anchors[i]];
          if (tabKey) {
            setActiveTab(tabKey);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始檢查
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabs, anchors, anchorToTab, loading]);

  // 當 tabs 變化時更新 activeTab
  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0].key);
    }
  }, [tabs, activeTab]);

  // Loading 模式
  if (loading) {
    return (
      <div className={`tabs ${className}`}>
        <div className="tabs__bg"></div>
        <div className="tabs__left max-md:hidden!">
          <Skeleton width={120} height={24} />
        </div>
        <div className="tabs__right">
          <Skeleton width={60} height={32} style={{ marginRight: 8 }} />
          <Skeleton width={60} height={32} style={{ marginRight: 8 }} />
          <Skeleton width={60} height={32} />
        </div>
      </div>
    );
  }

  // 沒有 tabs 時不渲染
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__bg"></div>
      <div className="tabs__left max-md:hidden!">
        {title && (
          <a href="#" className="tabs__title link">
            {title}
          </a>
        )}
      </div>
      <div className="tabs__right">
        {tabs.map((tab) => (
          <a
            key={tab.key}
            href={`#${tab.anchorId}`}
            className={`tab ${activeTab === tab.key ? "tab--active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

