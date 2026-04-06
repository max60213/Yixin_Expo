"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import './scroller.css';

interface ScrollerControlsProps {
  containerId: string;
}

export const ScrollerControls = ({ containerId }: ScrollerControlsProps) => {
  const [isBegin, setIsBegin] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const updateButtonVisibility = useCallback(() => {
    const container = scrollerRef.current;
    if (container) {
      setIsBegin(container.scrollLeft === 0);
      setIsEnd(container.scrollLeft + container.clientWidth === container.scrollWidth);
    }
  }, []);

  // 處理滾動功能，根據指定的方向滾動特定類別的內容
  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      // 獲取該類別的滾動容器元素
      const container = scrollerRef.current;
      if (!container) return;

      // 計算滾動距離（容器寬度的一半）
      const scrollAmount = container.clientWidth / 2;
      // 根據方向設定滾動目標位置
      const scrollTarget =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      // 使用平滑滾動效果移動到目標位置
      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });

      // 滾動後更新按鈕可見性
      setTimeout(() => updateButtonVisibility(), 300);
    },
    [updateButtonVisibility]
  );

  useEffect(() => {
    // 在 client-side 才執行
    const container = document.getElementById(containerId) as HTMLDivElement | null;
    if (container) {
      scrollerRef.current = container;

      // 初始化按鈕狀態
      setIsBegin(container.scrollLeft === 0);
      setIsEnd(container.scrollLeft + container.clientWidth === container.scrollWidth);

      // 添加滾動事件監聽器
      container.addEventListener('scroll', updateButtonVisibility);

      return () => {
        container.removeEventListener('scroll', updateButtonVisibility);
      };
    }
  }, [containerId, updateButtonVisibility]);

  return (
    <>
      <div className={`scroller__left ${isBegin ? 'scroller--hidden' : ''}`} onClick={() => scroll('left')}>
        <span className="material-symbols-rounded">arrow_forward_ios</span>
      </div>
      <div className={`scroller__right ${isEnd ? 'scroller--hidden' : ''}`} onClick={() => scroll('right')}>
        <span className="material-symbols-rounded">arrow_forward_ios</span>
      </div>
    </>
  );
};

