// app/lib/auth/authOptions.ts
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Strapi API 回應的類型
interface StrapiAuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// 擴充 User 類型以包含 Strapi JWT
interface StrapiUser {
  id: string;
  email: string;
  name: string;
  jwt: string;
  strapiUserId: number;
}

export const authOptions: AuthOptions = {
  // 配置認證提供者
  providers: [
    // ========== 1. Google OAuth ==========
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ========== 2. Strapi 原生認證 ==========
    CredentialsProvider({
      id: "credentials",
      name: "Strapi",
      credentials: {
        identifier: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<StrapiUser | null> {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("請輸入 Email 和密碼");
        }

        try {
          // 呼叫 Strapi 原生登入 API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            // 處理 Strapi 錯誤訊息
            const errorMessage = data.error?.message || "登入失敗";
            console.error("[Credentials] Strapi 登入失敗:", errorMessage);
            throw new Error(parseErrorMessage(errorMessage));
          }

          // 回傳使用者資料（包含 JWT）
          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.username,
            jwt: data.jwt,
            strapiUserId: data.user.id,
          };
        } catch (error) {
          console.error("[Credentials] 登入異常:", error);
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("登入失敗，請稍後再試");
        }
      },
    }),
  ],

  // 密鑰設定
  secret: process.env.NEXTAUTH_SECRET,

  // Session 策略：使用 JWT
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 天
  },

  // 回調函數
  callbacks: {
    /**
     * JWT 回調：統一處理兩種認證方式
     * 不管是 Google OAuth 還是 Credentials，最終都拿到 Strapi JWT
     */
    async jwt({ token, user, account }): Promise<JWT> {
      // ===== Credentials Provider 登入 =====
      if (user && "jwt" in user) {
        const strapiUser = user as StrapiUser;
        token.jwt = strapiUser.jwt;
        token.id = strapiUser.strapiUserId;
        token.provider = "credentials";
        token.email = strapiUser.email;
        token.name = strapiUser.name;
      }

      // ===== Google OAuth 登入 =====
      if (account?.provider === "google") {
        try {
          // 呼叫 Strapi 的 OAuth callback API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Strapi auth failed: ${response.status}`);
          }

          const data: StrapiAuthResponse = await response.json();

          // 將 Strapi 的 JWT 和使用者 ID 儲存到 token
          token.jwt = data.jwt;
          token.id = data.user.id;
          token.provider = "google";
        } catch (error) {
          console.error("[Google OAuth] Strapi 認證失敗:", error);
          // 即使 Strapi 認證失敗，仍然允許 NextAuth 登入
        }
      }

      return token;
    },

    /**
     * Session 回調：將 JWT token 中的資訊加入 session
     * 每次 getSession() 或 useSession() 時都會執行
     */
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        // 將 Strapi JWT 和使用者 ID 加入 session
        session.jwt = token.jwt as string | undefined;
        session.id = token.id as number | undefined;
        session.provider = token.provider as string | undefined;
      }
      return session;
    },
  },

  // 自訂頁面
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    // signOut: '/auth/signout',
  },

  // 除錯模式（開發環境）
  debug: process.env.NODE_ENV === "development",
};

/**
 * 解析 Strapi 錯誤訊息，轉換為使用者友善的訊息
 */
function parseErrorMessage(errorText: string): string {
  if (!errorText || typeof errorText !== "string") {
    return "登入失敗，請稍後再試";
  }

  const lowerError = errorText.toLowerCase();

  if (lowerError.includes("invalid") || lowerError.includes("incorrect") || 
      lowerError.includes("wrong") || lowerError.includes("identifier")) {
    return "Email 或密碼不正確";
  }
  
  if (lowerError.includes("not confirmed") || lowerError.includes("未確認")) {
    return "請先確認您的 Email";
  }
  
  if (lowerError.includes("blocked") || lowerError.includes("封鎖")) {
    return "此帳號已被封鎖";
  }
  
  if (lowerError.includes("network") || lowerError.includes("econnrefused") || 
      lowerError.includes("timeout") || lowerError.includes("enotfound")) {
    return "無法連接到伺服器，請檢查網路連線";
  }

  return errorText.length > 100 ? "登入失敗，請稍後再試" : errorText;
}
