"use client";

import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import NavItem from "./NavItem";
import "./navigation-items.css";

interface NavigationItemsProps {
  onTabClick: (key: string, href: string) => void;
  pendingPath: string | null;
}

const NavigationItems = forwardRef<HTMLUListElement, NavigationItemsProps>(
  ({ onTabClick, pendingPath }, forwardedRef) => {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const internalTabsRef = useRef<HTMLUListElement>(null);
    const padRef = useRef<HTMLDivElement>(null);

    // 將內部 ref 同步到 forwardedRef
    useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(internalTabsRef.current);
      } else if (forwardedRef) {
        forwardedRef.current = internalTabsRef.current;
      }
    }, [forwardedRef]);

    // 使用 useMemo 避免每次 render 都產生新的陣列，導致 useEffect 無限迴圈
    const navigationItems = useMemo(() => [
      { href: "/", label: t("home"), key: "home", icon: "home" },
      { href: "/explore", label: t("explore"), key: "explore", icon: "explore" },
      { href: "/profile", label: t("Profile"), key: "profile", icon: "palette" },
    ], [t]);

    const isActive = useCallback(
      (href: string) => {
        const currentPath = pendingPath ?? pathname;

        if (href === "/") {
          return currentPath === "/";
        }
        return currentPath.startsWith(href);
      },
      [pendingPath, pathname]
    );

    const handleTabPad = useCallback((key: string, animate: boolean = true) => {
      const tabs = internalTabsRef.current;
      const pad = padRef.current;

      if (!tabs || !pad) return;

      const tab = tabs.querySelector(`#${key}`) as HTMLElement;
      if (!tab) return;

      const tabRect = tab.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();

      const leftPercent = ((tabRect.left - tabsRect.left) / tabsRect.width) * 100;
      const widthPercent = (tabRect.width / tabsRect.width) * 100;
      const height = tabRect.height;

      if (animate) {
        gsap.to(pad, {
          left: `${leftPercent}%`,
          width: `${widthPercent}%`,
          height,
          duration: 0.8,
          ease: "elastic.out(0.9, 0.8)",
        });
      } else {
        gsap.set(pad, { left: `${leftPercent}%`, width: `${widthPercent}%`, height });
      }
    }, [pathname]);

    const handleClick = (key: string, href: string) => {
      handleTabPad(key, true);
      onTabClick(key, href);
    };

    // 監聽路徑變化以更新 Tab Pad 位置 (處理重新整理或上一頁的情況)
    const isFirstRender = useRef(true);

    useEffect(() => {
      const activeItem = navigationItems.find((item) => isActive(item.href));
      if (activeItem) {
        if (isFirstRender.current) {
          handleTabPad(activeItem.key, false); // 初始載入不執行動畫 (Snap)
          isFirstRender.current = false;
        } else {
          handleTabPad(activeItem.key, true); // 路徑變更時執行動畫
        }
      }
    }, [navigationItems, isActive, handleTabPad]);

    return (
      <ul className="navigation__items__tabs" ref={internalTabsRef}>
        <div className="navigation__items__pad" ref={padRef}></div>
        {navigationItems.map((item) => (
          <NavItem
            id={item.key}
            key={item.key}
            href={item.href}
            isActive={isActive(item.href)}
            icon={item.icon}
            label={item.label}
            onClick={() => handleClick(item.key, item.href)}
          />
        ))}
      </ul>
    );
  });

NavigationItems.displayName = "NavigationItems";

export default NavigationItems;
