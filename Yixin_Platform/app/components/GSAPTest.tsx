"use client";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './gsap-test.css';
import { useRef, useEffect } from 'react';

const GSAPTest = () => {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // 創建 tween 並保存引用
    tweenRef.current = gsap.to('.box', {
      x: 200,
      duration: 1,
      paused: true, // 暫停動畫，手動控制進度
    });
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tweenRef.current) return;

      // 計算滑鼠 x 座標在螢幕上的百分比 (0-1)
      const progress = e.clientX / window.innerWidth;
      
      // 使用 progress() 來控制動畫進度
      tweenRef.current.progress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="gsap-test">
      <div className="box">
        <h1>Hello World</h1>
      </div>
    </div>
  );
};

export default GSAPTest;