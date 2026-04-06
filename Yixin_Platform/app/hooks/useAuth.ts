"use client";

import { useSession, signOut } from "next-auth/react";
import { useMemo, useCallback } from "react";

/**
 * 統一的用戶資料類型
 */
interface UnifiedUser {
  /** Strapi 使用者 ID */
  id?: number;
  /** 使用者名稱 */
  name?: string;
  /** Email */
  email?: string;
  /** 頭像 URL */
  image?: string | null;
  /** 認證提供者 (google | credentials) */
  provider?: string;
}

/**
 * useAuth Hook 的回傳值
 */
interface UseAuthReturn {
  /** 使用者資料 */
  user: UnifiedUser | null;
  /** 是否正在載入 */
  isLoading: boolean;
  /** 是否已登入 */
  isAuthenticated: boolean;
  /** 頭像 URL */
  avatarUrl: string | null;
  /** Strapi JWT Token */
  jwt: string | null;
  /** Strapi 使用者 ID */
  userId: number | null;
  /** 登出函數 */
  logout: () => Promise<void>;
  /** 認證提供者 */
  provider: string | null;
}

/**
 * 統一的認證 Hook
 * 
 * 整合 Google OAuth 和 Strapi 原生認證
 * 所有認證都透過 NextAuth 統一管理
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isLoading, isAuthenticated, logout } = useAuth();
 * 
 *   if (isLoading) return <div>載入中...</div>;
 *   if (!isAuthenticated) return <div>請先登入</div>;
 * 
 *   return (
 *     <div>
 *       <p>歡迎，{user.name}</p>
 *       <button onClick={logout}>登出</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  
  const isLoading = status === "loading";

  // 統一的用戶資料
  const user: UnifiedUser | null = useMemo(() => {
    if (!session?.user) return null;

      return {
      id: session.id,
        name: session.user.name ?? undefined,
        email: session.user.email ?? undefined,
        image: session.user.image,
      provider: session.provider,
      };
  }, [session]);
    
  // 頭像 URL
  const avatarUrl = useMemo((): string | null => {
    if (!user?.image) return null;
    
    // NextAuth 的 image 已經是完整 URL
    if (typeof user.image === "string") {
      return user.image;
    }
    
    return null;
  }, [user]);

  // 登出函數
  const logout = useCallback(async () => {
    try {
        await signOut({ redirect: false });
      
      // 發送自定義事件通知其他組件
      window.dispatchEvent(new Event("auth:logout"));
      
      // 重導向到首頁
      window.location.href = "/";
    } catch (error) {
      console.error("[useAuth] 登出失敗:", error);
      window.location.href = "/";
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!session?.jwt,
    avatarUrl,
    jwt: session?.jwt ?? null,
    userId: session?.id ?? null,
    logout,
    provider: session?.provider ?? null,
  };
}
