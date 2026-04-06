// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * 擴充 Session 類型
   * 加入 Strapi JWT 和使用者 ID
   */
  interface Session {
    /** Strapi JWT Token */
    jwt?: string;
    /** Strapi 使用者 ID */
    id?: number;
    /** 認證提供者 (google | credentials) */
    provider?: string;
  }

  /**
   * 擴充 User 類型
   * 用於 Credentials Provider 回傳的使用者資料
   */
  interface User {
    /** Strapi JWT Token */
    jwt?: string;
    /** Strapi 使用者 ID */
    strapiUserId?: number;
  }
}

declare module "next-auth/jwt" {
  /**
   * 擴充 JWT 類型
   * NextAuth 內部使用的 token 結構
   */
  interface JWT {
    /** Strapi JWT Token */
    jwt?: string;
    /** Strapi 使用者 ID */
    id?: number;
    /** 認證提供者 (google | credentials) */
    provider?: string;
  }
}

