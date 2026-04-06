'use client';

/**
 * ProfileAnimations - 處理 Profile 頁面的 GSAP 動畫
 * 
 * 這是一個 Client Component，負責管理滾動動畫
 * 透過 useGSAP 執行動畫，確保在資料載入後才執行
 */

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useBreakpoints } from '@/app/hooks/useBreakpoints';

gsap.registerPlugin(ScrollTrigger);

interface ProfileAnimationsProps {
  /** 是否正在載入（true 時不執行動畫） */
  isLoading?: boolean;
}

/**
 * ProfileAnimations
 * 
 * 放在 ProfilePage 內，負責執行 GSAP 滾動動畫
 * 這個組件不渲染任何 UI，只負責動畫效果
 */
export function ProfileAnimations({ isLoading = false }: ProfileAnimationsProps) {
  const { mdUp } = useBreakpoints();

  useGSAP(() => {
    if (isLoading) return;

    // 只在 mdUp (>= 800px) 時執行 navbar 隱藏動畫
    if (mdUp) {
      gsap.to('.app-bar, .navigation', {
        y: '-74px',
        ease: "linear",
        scrollTrigger: {
          trigger: '.profile-header',
          start: 'bottom 74px',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Tabs 背景展開動畫
    gsap.fromTo('.profile-tabs .tabs__bg',
      {
        width: "100%",
      },
      {
        width: "100vw",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: '.profile-header',
          start: 'bottom 74px',
          end: 'bottom top',
          scrub: true,
        },
      });

    // Tabs 標題淡入動畫
    gsap.from('.profile-tabs .tabs__title', {
      opacity: 0,
      y: 10,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: '.profile-header',
        start: 'bottom 74px',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { dependencies: [mdUp, isLoading], revertOnUpdate: true });

  // 這個組件不渲染任何 UI
  return null;
}

export default ProfileAnimations;
