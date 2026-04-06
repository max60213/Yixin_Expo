"use client";

import "./header.css";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "@/app/hooks/useAuth";
import Avvvatars from "avvvatars-react";

interface Stat {
  number: string | number;
  label: string;
}

interface HeaderProps {
  /** 名稱,undefined 時顯示 Skeleton */
  name?: string;
  /** 國家,undefined 時顯示 Skeleton */
  country?: string;
  /** 地區 */
  region?: string;
  /** 統計數據,undefined 時顯示 Skeleton */
  stats?: Stat[];
  /** 頭像 URL,undefined 時顯示 Skeleton */
  avatar?: string;
  /** 是否為 loading 狀態 */
  loading?: boolean;
  /** 是否為自己的頁面（從 auth session 取 avatar） */
  isMe?: boolean;
}

/**
 * Header 組件 (Client Component)
 * 
 * 只負責渲染，不做資料獲取。
 * loading=true 或 props 為 undefined 時顯示 Skeleton。
 * 
 * isMe=true 時，從 auth session 取得 avatar（與 AccountMenu 一致）
 * 非 isMe 時，placeholder fallback 由 ProfilePage 處理
 */
const Header = ({
  name,
  country,
  region,
  stats,
  avatar,
  loading = false,
  isMe = false,
}: HeaderProps) => {
  const { user, avatarUrl: authAvatarUrl } = useAuth();
  const isLoading = loading || !name;

  // 決定使用哪個 avatar：isMe 時優先用 auth session 的 avatar
  const displayAvatar = isMe ? (authAvatarUrl || avatar) : avatar;
  // 用於 Avvvatars 的 fallback 名稱
  const fallbackName = user?.name || user?.email || name || "user";

  return (
    <div className="profile-header">
      <div className="profile-header__info">
        {/* Avatar */}
        <div className="profile-header__avatar">
          {isLoading ? (
            <Skeleton circle width="100%" height="100%" />
          ) : isMe ? (
            // isMe 優先處理：有 authAvatarUrl 就顯示，否則用 Avvvatars
            authAvatarUrl ? (
              <img src={authAvatarUrl} alt={name || "User"} className="profile-header__avatar-img" />
            ) : (
              <div className="profile-header__avatar--generated">
                <Avvvatars
                  value={fallbackName}
                  size={100}
                  style="character"
                />
              </div>
            )
          ) : avatar ? (
            // 非 isMe 的情況：顯示傳入的 avatar
            <img src={avatar} alt={name || "User"} className="profile-header__avatar-img" />
          ) : null}
        </div>

        {/* Details */}
        <div className="profile-header__details">
          <h1 className="profile-header__details__name">
            {isLoading ? <Skeleton width={180} /> : name}
          </h1>
          <p className="profile-header__details__location">
            {isLoading ? (
              <Skeleton width={120} />
            ) : (
              <>
                {country}
                {region && `・${region}`}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-header__states">
        {isLoading ? (
          // Loading 狀態:顯示 2 個 skeleton stats
          <>
            <div className="profile-states">
              <span className="profile-states__number"><Skeleton width={30} /></span>
              <span className="profile-states__label"><Skeleton width={50} /></span>
            </div>
            <div className="profile-states">
              <span className="profile-states__number"><Skeleton width={30} /></span>
              <span className="profile-states__label"><Skeleton width={50} /></span>
            </div>
          </>
        ) : (
          stats?.map((stat, index) => (
            <div key={index} className="profile-states">
              <span className="profile-states__number">{stat.number}</span>
              <span className="profile-states__label">{stat.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Header;
