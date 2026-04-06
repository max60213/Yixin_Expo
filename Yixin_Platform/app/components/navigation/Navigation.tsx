"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useSearchContext } from "@/app/context/searchContext";
import SearchIcon from "@/public/icon/search.svg";
import { Link } from "@/i18n/navigation";
import { useBreakpoints } from "@/app/hooks/useBreakpoints";
import NavigationItems from "./NavigationItems";
import "./navigation.css";
import "./search.css";

const Navigation2 = () => {
  const t = useTranslations("Navigation");
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLUListElement>(null);
  const { isSearchFocused, setIsSearchFocused } = useSearchContext();
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const searchLinkRef = useRef<HTMLAnchorElement>(null);
  const [searchHref, setSearchHref] = useState("/search");
  const { mdDown } = useBreakpoints();

  // 追蹤即將導航的路徑（點擊時立即設定）
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const handleTabClick = (key: string, href: string) => {
    setIsSearchFocused(false);
    setPendingPath(href);
  };



  const handleSearchClick = (e: React.MouseEvent) => {
    if (!isSearchFocused) {
      e.preventDefault();
      setIsSearchFocused(true);
      searchFieldRef.current?.focus();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // 阻止原生 form submit

    // 確保只有在搜尋模式時才導航
    if (!isSearchFocused) return;

    const query = searchFieldRef.current?.value?.trim();
    // 先更新 href，然後觸發隱藏的 Link
    const href = query ? `/search?q=${encodeURIComponent(query)}` : "/search";
    setSearchHref(href);

    // 用 setTimeout 確保 href 已更新後再觸發點擊
    setTimeout(() => {
      searchLinkRef.current?.click();
    }, 0);
  };

  // 點擊 navigation container 外部時關閉搜尋
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // 檢查點擊是否在 container 之外
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsSearchFocused(false);
      }
    };

    if (isSearchFocused) {
      // 延遲添加監聽器，避免觸發搜尋的點擊事件立即關閉搜尋
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isSearchFocused]);

  // 處理 iOS 鍵盤彈出時的位置調整
  useEffect(() => {
    if (!mdDown || !isSearchFocused) return;

    const handleViewportResize = () => {
      if (!window.visualViewport || !containerRef.current) return;

      const offset = window.innerHeight - window.visualViewport.height;
      // 用 GSAP 平滑調整 bottom 位置
      gsap.to(containerRef.current, {
        bottom: offset > 0 ? `${offset}px` : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    };

    window.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          bottom: 0,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };
  }, [isSearchFocused, mdDown]);

  // 設定 navigation container 的寬度
  useEffect(() => {
    const getDefaultNavWidth = () => {
      const tabBarWidth = tabsRef.current?.getBoundingClientRect().width;
      if (!tabBarWidth) return "auto";
      return tabBarWidth + (mdDown ? 66 : 48);
    };

    const animationConfig = {
      duration: 0.6,
      ease: "power3.inOut",
    };

    if (isSearchFocused) {
      gsap.to(".navigation__container", {
        ...animationConfig,
        width: mdDown ? "100vw" : 630,
        ...(mdDown ? {} : { height: 60 }),
      });
    } else {
      gsap.to(".navigation__container", {
        ...animationConfig,
        width: getDefaultNavWidth(),
        ...(mdDown ? {} : { height: 44 }),
        clearProps: mdDown ? "width" : "width, height",
      });
    }
  }, [isSearchFocused, mdDown]);

  return (
    <div className="navigation">
      {/* 隱藏的 Link，用於程式化導航（支援 TransitionRouter） */}
      <Link
        ref={searchLinkRef}
        href={searchHref}
        style={{ display: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <nav ref={containerRef} className={`navigation__container ${isSearchFocused ? "search-mode" : ""}`}>
        <button type="button" className="navigation__back-button" onClick={() => setIsSearchFocused(false)}>
          <span className="material-symbols-rounded size--24">arrow_back_ios_new</span>
        </button>
        <form className="navigation__items" onSubmit={handleSearchSubmit}>
          <NavigationItems ref={tabsRef} onTabClick={handleTabClick} pendingPath={pendingPath} />
          <div className="search-field">
            <input type="text" name="q" className="h3" ref={searchFieldRef} placeholder="搜尋..." />
            <button type="button" className="material-symbols-rounded clear" onClick={() => {
              if (searchFieldRef.current) searchFieldRef.current.value = "";
            }}>close</button>
          </div>
          <button
            type={isSearchFocused ? "submit" : "button"}
            className="search navigation__items__search"
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </button>
        </form>
      </nav>
    </div>
  );
};

export default Navigation2;