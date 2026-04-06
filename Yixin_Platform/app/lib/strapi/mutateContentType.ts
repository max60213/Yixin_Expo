// app/lib/strapi/mutateContentType.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";
import { getUndiciAgent, getStrapiURL } from "./client";

type HttpMethod = "POST" | "PUT" | "DELETE";

interface MutateOptions {
  /** HTTP 方法，預設 POST */
  method?: HttpMethod;
  /** 要傳送的資料 */
  data?: Record<string, unknown>;
  /** 是否需要認證，預設 true */
  requireAuth?: boolean;
}

interface MutateResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * ============================================================
 * 統一處理 Strapi Content Type 的寫入操作
 * ============================================================
 * 
 * 對應 fetchContentType.ts（GET），這個處理 POST/PUT/DELETE
 * 
 * @param contentType - Content Type 名稱或完整路徑
 * @param options - 操作選項
 * @returns 操作結果
 * 
 * @example
 * ```typescript
 * // 新增資料
 * await mutateContentType("artworks", {
 *   method: "POST",
 *   data: { title: "新作品", description: "..." }
 * });
 * 
 * // 更新資料
 * await mutateContentType("artworks/abc123", {
 *   method: "PUT",
 *   data: { title: "更新標題" }
 * });
 * 
 * // 刪除資料
 * await mutateContentType("artworks/abc123", {
 *   method: "DELETE"
 * });
 * ```
 */
export async function mutateContentType<T = any>(
  contentType: string,
  options: MutateOptions = {}
): Promise<MutateResult<T>> {
  const { method = "POST", data, requireAuth = true } = options;

  try {
    // 取得認證資訊
    let jwt: string | null = null;
    
    if (requireAuth) {
      const session = await getServerSession(authOptions);
      if (!session?.jwt) {
        return {
          success: false,
          error: "未登入或 JWT 不存在",
        };
      }
      jwt = session.jwt;
    }

    // 建構 URL
    const endpoint = contentType.startsWith("/") ? contentType : `/${contentType}`;
    const url = getStrapiURL(`/api${endpoint}`);

    // 建構 fetch 選項
    const fetchOptions: RequestInit & { dispatcher?: any } = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
      ...(data ? { body: JSON.stringify({ data }) } : {}),
    };

    // 在服務器端且 URL 是 HTTPS 時，使用 undici agent
    if (typeof window === "undefined" && url.startsWith("https://")) {
      const agent = getUndiciAgent();
      if (agent) {
        fetchOptions.dispatcher = agent;
      }
    }

    console.log(`[mutateContentType] ${method} ${url}`);

    const response = await fetch(url, fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
      console.error(`[mutateContentType] 錯誤:`, {
        status: response.status,
        error: responseData.error,
      });
      
      return {
        success: false,
        error: responseData.error?.message || `操作失敗: ${response.status}`,
      };
    }

    return {
      success: true,
      data: responseData.data ?? responseData,
    };
  } catch (error) {
    console.error("[mutateContentType] 異常:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "操作失敗",
    };
  }
}

/**
 * ============================================================
 * 更新使用者關聯（收藏、追蹤等）
 * ============================================================
 * 
 * 使用 Strapi users-permissions 插件的 /users/me 端點
 * 
 * @param relation - 關聯名稱 (artworks, events, artists 等)
 * @param action - 操作類型 (connect | disconnect | set)
 * @param itemIds - 項目的 documentId 陣列
 * @returns 操作結果
 * 
 * @example
 * ```typescript
 * // 新增收藏
 * await updateUserRelation("artworks", "connect", ["abc123"]);
 * 
 * // 移除收藏
 * await updateUserRelation("artworks", "disconnect", ["abc123"]);
 * 
 * // 設定完整列表
 * await updateUserRelation("artworks", "set", ["abc123", "def456"]);
 * ```
 */
export async function updateUserRelation(
  relation: string,
  action: "connect" | "disconnect" | "set",
  itemIds: string[]
): Promise<MutateResult<any>> {
  const session = await getServerSession(authOptions);
  
  if (!session?.jwt) {
    return {
      success: false,
      error: "未登入",
    };
  }

  try {
    // 使用 users-permissions 的 /users/me 端點
    const url = getStrapiURL("/api/users-permissions/users/me");

    // Body 格式（不需要外層 data 包裝）
    const body = {
      [relation]: {
        [action]: itemIds,
      },
    };

    const fetchOptions: RequestInit & { dispatcher?: any } = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.jwt}`,
      },
      body: JSON.stringify(body),
    };

    // 在服務器端且 URL 是 HTTPS 時，使用 undici agent
    if (typeof window === "undefined" && url.startsWith("https://")) {
      const agent = getUndiciAgent();
      if (agent) {
        fetchOptions.dispatcher = agent;
      }
    }

    console.log(`[updateUserRelation] ${action} ${relation}:`, itemIds);

    const response = await fetch(url, fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
      console.error("[updateUserRelation] 錯誤:", responseData);
      return {
        success: false,
        error: responseData.error?.message || `操作失敗: ${response.status}`,
      };
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("[updateUserRelation] 異常:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "操作失敗",
    };
  }
}

// 導出 MutateResult 類型供其他模組使用
export type { MutateResult };
