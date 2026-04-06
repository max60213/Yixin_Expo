// app/lib/strapi/authClient.ts
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/lib/auth/authOptions";
import { getUndiciAgent, getStrapiURL } from "./client";

/**
 * ============================================================
 * Client Component 使用：帶認證的 Strapi API 呼叫
 * ============================================================
 * 
 * 自動從 NextAuth client session 取得 JWT
 * 
 * @param endpoint - API 端點，例如："/users/me" 或 "/artworks"
 * @param options - fetch 選項
 * @returns API 回應的 JSON 資料
 * 
 * @example
 * ```typescript
 * // 取得當前使用者資料
 * const user = await fetchWithAuth("/users/me?populate=favorites");
 * 
 * // 新增收藏
 * const result = await fetchWithAuth("/artworks", {
 *   method: "POST",
 *   body: JSON.stringify({ data: { title: "新作品" } }),
 * });
 * ```
 */
export async function fetchWithAuth<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getSession();

  if (!session?.jwt) {
    throw new Error("未登入或 JWT 不存在");
  }

  const url = endpoint.startsWith("http")
    ? endpoint
    : getStrapiURL(`/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.jwt}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[fetchWithAuth] API 錯誤:", response.status, errorText);
    throw new Error(`API 錯誤: ${response.status}`);
  }

  return response.json();
}

/**
 * ============================================================
 * Server Component 使用：帶認證的 Strapi API 呼叫
 * ============================================================
 * 
 * 自動從 NextAuth server session 取得 JWT
 * 
 * @param endpoint - API 端點，例如："/users/me" 或 "/artworks"
 * @param options - fetch 選項
 * @returns API 回應的 JSON 資料
 * 
 * @example
 * ```typescript
 * // 在 Server Component 中
 * export default async function MyPage() {
 *   const user = await fetchWithAuthServer("/users/me");
 *   return <div>{user.username}</div>;
 * }
 * ```
 */
export async function fetchWithAuthServer<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const session = await getServerSession(authOptions);

  if (!session?.jwt) {
    throw new Error("未登入或 JWT 不存在");
  }

  return fetchWithJwt<T>(session.jwt, endpoint, options);
}

/**
 * ============================================================
 * 底層函式：使用指定的 JWT 呼叫 Strapi API
 * ============================================================
 * 
 * 當你已經有 JWT 時使用這個函式
 * 
 * @param jwt - Strapi JWT token
 * @param endpoint - API 端點
 * @param options - fetch 選項
 * @returns API 回應的 JSON 資料
 * 
 * @example
 * ```typescript
 * const jwt = session.jwt;
 * const user = await fetchWithJwt(jwt, "/users/me");
 * ```
 */
export async function fetchWithJwt<T = any>(
  jwt: string,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : getStrapiURL(`/api${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);

  // 建構 fetch 選項
  const fetchOptions: RequestInit & { dispatcher?: any } = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      ...options.headers,
    },
  };

  // 在服務器端且 URL 是 HTTPS 時，使用 undici agent
  if (typeof window === "undefined" && url.startsWith("https://")) {
    const agent = getUndiciAgent();
    if (agent) {
      fetchOptions.dispatcher = agent;
    }
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[fetchWithJwt] API 錯誤:", response.status, errorText);
    throw new Error(`API 錯誤: ${response.status}`);
  }

  return response.json();
}

/**
 * ============================================================
 * 輔助函式：取得當前使用者的 Strapi JWT
 * ============================================================
 * 
 * Server Component 使用
 * 
 * @returns Strapi JWT token 或 null
 */
export async function getStrapiJWT(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return session?.jwt ?? null;
}

/**
 * ============================================================
 * 輔助函式：取得當前使用者的 Strapi ID
 * ============================================================
 * 
 * Server Component 使用
 * 
 * @returns Strapi 使用者 ID 或 null
 */
export async function getStrapiUserId(): Promise<number | null> {
  const session = await getServerSession(authOptions);
  return session?.id ?? null;
}

/**
 * ============================================================
 * 輔助函式：檢查使用者是否已登入
 * ============================================================
 * 
 * Server Component 使用
 * 
 * @returns 是否已登入
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.jwt;
}
