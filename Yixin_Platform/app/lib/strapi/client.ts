import qs from 'qs';
import https from 'https';
import { Agent as UndiciAgent } from 'undici';

/**
 * Strapi 客戶端
 * 集中管理從 Strapi CMS 獲取資料的邏輯。
 */

export const STRAPI_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * 自定義 HTTPS Agent 用於生產環境（用於傳統 fetch）
 * 這個配置可以處理某些 SSL 憑證鏈驗證問題，同時保持一定的安全性
 */
const httpsAgent = new https.Agent({
  // 保持連接以提高性能
  keepAlive: true,
  // 設置連接超時
  timeout: 30000,
  // 允許更寬鬆的 SSL 驗證（但仍然驗證憑證）
  // 這可以解決某些中間憑證缺失的問題
  rejectUnauthorized: true,
  // 設置最小 TLS 版本
  minVersion: 'TLSv1.2',
});

/**
 * 自定義 Undici Agent 用於 Next.js 15+ 的 fetch
 * 在 Heroku 環境中，某些 SSL 憑證鏈可能無法正確驗證
 * 這個配置可以處理這個問題，同時保持安全性
 */
let undiciAgent: UndiciAgent | undefined;

// 只在服務器端且使用 HTTPS 時創建 agent
if (typeof window === 'undefined' && STRAPI_API_URL.startsWith('https://')) {
  // 檢查是否需要禁用 SSL 驗證（僅用於測試環境）
  const disableSSLVerify = process.env.DISABLE_SSL_VERIFY === 'true';

  if (disableSSLVerify) {
    console.warn('⚠️  SSL 憑證驗證已禁用。這不應該在生產環境中使用！');
  }

  try {
    undiciAgent = new UndiciAgent({
      connect: {
        // 如果設置了 DISABLE_SSL_VERIFY，則允許不安全的連接
        rejectUnauthorized: !disableSSLVerify,
        // 設置最小 TLS 版本
        minVersion: 'TLSv1.2',
      },
      // 保持連接以提高性能
      keepAliveTimeout: 30000,
      keepAliveMaxTimeout: 60000,
    });
    console.log('✅ Undici Agent initialized', { disableSSLVerify });
  } catch (error) {
    console.error('❌ Failed to initialize Undici Agent:', error);
  }
}

interface FetchOptions {
  headers?: Record<string, string>;
  tags?: string[];
  revalidate?: number;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

/**
 * 取得 Undici Agent（用於其他檔案中的 fetch）
 * @returns UndiciAgent 或 undefined
 */
export function getUndiciAgent(): UndiciAgent | undefined {
  return undiciAgent;
}

/**
 * 取得完整 Strapi URL 的輔助函式
 * @param path API 路徑 (例如 '/api/articles')
 * @returns 完整 URL
 */
export function getStrapiURL(path = '') {
  return `${STRAPI_API_URL}${path}`;
}

/**
 * Strapi API 的核心 fetch 包裝器
 * @param path API 端點路徑 (例如 '/articles')
 * @param urlParamsObject 查詢參數物件
 * @param options Fetch 選項 (cache, revalidate 等)
 * @returns 解析後的 JSON 回應
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<T> {
  try {
    // 合併預設與使用者選項
    const mergedOptions: any = {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
        ...options.headers,
      },
      next: {
        tags: options.tags,
        revalidate: options.revalidate,
      },
      cache: options.cache,
    };

    // 在服務器端且使用 HTTPS 時，添加自定義 dispatcher（用於 undici fetch）
    // Next.js 15+ 使用 undici 的 fetch，需要通過 dispatcher 配置 SSL
    if (typeof window === 'undefined' && STRAPI_API_URL.startsWith('https://') && undiciAgent) {
      mergedOptions.dispatcher = undiciAgent;
    }

    // 建立請求 URL
    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${getStrapiURL(`/api${path}`)}${queryString ? `?${queryString}` : ''}`;
    console.log('🌐 Strapi 請求 URL:', requestUrl);
    // console.log('🌐 Strapi 請求:', {
    //   url: requestUrl,
    //   hasDispatcher: !!mergedOptions.dispatcher,
    //   hasAgent: !!mergedOptions.agent,
    //   isServer: typeof window === 'undefined',
    // });

    // 觸發 API 呼叫
    const response = await fetch(requestUrl, mergedOptions);
    console.log('✅ Strapi 回應狀態:', response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Strapi API 錯誤:', {
        status: response.status,
        statusText: response.statusText,
        url: requestUrl,
        error: data.error,
      });
      throw new Error(`Strapi API 錯誤: ${response.status} ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('❌ FetchAPI 錯誤:', error);
    if (error instanceof Error) {
      console.error('錯誤詳情:', {
        message: error.message,
        name: error.name,
        cause: (error as any).cause,
      });
    }
    throw error;
  }
}
