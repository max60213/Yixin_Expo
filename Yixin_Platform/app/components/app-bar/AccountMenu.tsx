"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import AccountMenuItem from "./AccountMenuItem";
import Avvvatars from "avvvatars-react";
import "./account-menu.css";

export default function AccountMenu() {
  const { user, isLoading, isAuthenticated, avatarUrl, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // GSAP 動畫：使用 useGSAP hook（官方推薦）
  useGSAP(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    if (showMenu) {
      // 打開動畫：從上方滑入
      gsap.to(dropdown,
        {
          opacity: 1,
          y: 54,
          duration: 0.3,
          ease: "power3.out",
        }
      );
    } else {
      // 關閉動畫：往上滑出
      gsap.to(dropdown, {
        y: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(dropdown, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
      });
    }
  }, { dependencies: [showMenu], scope: menuRef });

  // 點擊外部關閉選單
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleSignOut = async () => {
    setShowMenu(false);
    await logout();
  };

  // 載入中狀態
  if (isLoading) {
    return (
      <div className="account-menu__loading">
        <div className="account-menu__loading-spinner"></div>
      </div>
    );
  }

  // 未登入狀態
  if (!isAuthenticated) {
    return (
      <Link href="/auth/login" className="account-menu__login">
        {/* <span className="material-symbols-rounded">login</span> */}
        <span className="account-menu__login__text">登入</span>
      </Link>
    );
  }

  // 已登入狀態
  return (
    <div className="account-menu" ref={menuRef}>
      <button
        className="account-menu__trigger"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="使用者選單"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={user?.name || "User"}
            className="account-menu__avatar"
          />
        ) : (
          <div className="account-menu__avatar account-menu__avatar--generated">
            <Avvvatars
              value={user?.name || user?.email || "user"}
              size={40}
              style="character"
            />
          </div>
        )}
      </button>

      <div
        ref={dropdownRef}
        className={`account-menu__dropdown ${showMenu ? 'active' : ''}`}
      >
        {/* 使用者資訊 */}
        <div className="account-menu__user">
          <div className="account-menu__user__name">
            {user?.name || "使用者"}
          </div>
          <div className="account-menu__user__email caption">
            {user?.email}
          </div>
        </div>


        {/* 選單項目 */}
        <div className="account-menu__items-wrapper">
          <div className="account-menu__items">
            <AccountMenuItem
              href="/profile"
              onClick={() => setShowMenu(false)}
              icon="person"
              label="個人資料"
            />
            <AccountMenuItem
              href="/profile/artworks"
              onClick={() => setShowMenu(false)}
              icon="bookmark"
              label="我的收藏"
            />
          </div>

          {/* 登出按鈕 */}
          <AccountMenuItem
            onClick={handleSignOut}
            icon="logout"
            label="登出"
            variant="logout"
          />
        </div>
      </div>
    </div>
  );
}

