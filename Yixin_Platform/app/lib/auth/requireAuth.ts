import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";
import type { Session } from "next-auth";

/**
 * Server Component 使用：強制要求登入
 * 如果使用者未登入，會自動重導向到登入頁面
 * 
 * @returns NextAuth Session（包含 jwt 和 id）
 * 
 * @example
 * ```typescript
 * export default async function ProtectedPage() {
 *   const session = await requireAuth();
 *   
 *   return <div>歡迎，使用者 {session.id}</div>;
 * }
 * ```
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return session;
}

/**
 * Server Component 使用：檢查是否有 Strapi JWT
 * 如果沒有 JWT，會重導向到登入頁面
 * 
 * @returns Strapi JWT token
 * 
 * @example
 * ```typescript
 * export default async function ProtectedPage() {
 *   const jwt = await requireStrapiAuth();
 *   
 *   // 使用 jwt 呼叫 Strapi API
 *   const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
 *     headers: { Authorization: `Bearer ${jwt}` }
 *   });
 * }
 * ```
 */
export async function requireStrapiAuth(): Promise<string> {
  const session = await requireAuth();

  if (!session.jwt) {
    console.error("[requireStrapiAuth] Session 存在但缺少 JWT");
    redirect("/auth/login");
  }

  return session.jwt;
}

/**
 * Server Component 使用：檢查使用者權限
 * 
 * ⚠️ 注意：這個函數目前只是範例，實際權限檢查需要從 Strapi 取得使用者角色
 * 
 * @param allowedRoles - 允許的角色列表
 * @returns Session
 * 
 * @example
 * ```typescript
 * export default async function AdminPage() {
 *   await requireRole(["admin", "editor"]);
 *   
 *   return <div>管理頁面</div>;
 * }
 * ```
 */
export async function requireRole(allowedRoles: string[]): Promise<Session> {
  const session = await requireAuth();

  // TODO: 實作實際的角色檢查
  // 需要從 Strapi 取得使用者的角色資訊
  // 例如：
  // const jwt = session.jwt;
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me?populate=role`, {
  //   headers: { Authorization: `Bearer ${jwt}` }
  // });
  // const data = await response.json();
  // const userRole = data.role.name;
  //
  // if (!allowedRoles.includes(userRole)) {
  //   redirect("/unauthorized");
  // }

  console.warn("[requireRole] 尚未實作實際的角色檢查");

  return session;
}

