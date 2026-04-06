"use client";

import { TransitionRouter } from "next-transition-router";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {

  const isFirstMount = useRef(true);

  // 處理首次載入的淡入
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;

      // 首次載入時執行淡入動畫
      gsap.fromTo(
        ".page-transition",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        }
      );
    }

    // 處理瀏覽器前進/後退（bfcache 恢復）
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log("從 bfcache 恢復");
        // 從 bfcache 恢復，瞬間淡入
        gsap.fromTo(
          ".page-transition",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0,
            ease: "power2.inOut",
          }
        );
      }
    };

    // 處理瀏覽器前進/後退按鈕（popstate）
    const handlePopState = () => {
      // 確保頁面可見（瞬間淡入）
      setTimeout(() => {
        gsap.fromTo(
          ".page-transition",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          }
        );
      }, 200);
    };

    // 在 pagehide 時設定 opacity 為 0，準備下次返回
    const handlePageHide = () => {
      console.log("頁面即將隱藏");
      const mainElement = document.querySelector(".page-transition") as HTMLElement;
      if (mainElement) {
        mainElement.style.opacity = "0";
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        const tween = gsap.to(".page-transition", {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: next,
        });

        return () => tween.kill();
      }}
      enter={(next) => {
        // 先設定為透明
        gsap.set(".page-transition", { opacity: 0 });

        // 執行 next() 讓新頁面內容載入
        next();

        // 然後執行淡入動畫
        const tween = gsap.to(".page-transition", {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });

        return () => tween.kill();
      }}
    >
      {children}
    </TransitionRouter>
  );
}

