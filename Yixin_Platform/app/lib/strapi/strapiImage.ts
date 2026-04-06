import { unstable_noStore as noStore } from 'next/cache';

export function strapiImage(url: string | undefined | null): string {
  noStore();
  if (!url) return '';
  if (url.startsWith('/')) {
    if (
      !process.env.NEXT_PUBLIC_API_URL &&
      document?.location.host.endsWith('.strapidemo.com')
    ) {
      return `https://${document.location.host.replace('client-', 'api-')}${url}`;
    }

    return process.env.NEXT_PUBLIC_API_URL + url;
  }
  return url;
}

/**
 * 生成 Next.js Image 組件的 blurDataURL
 * 使用 Next.js 內建的圖片優化功能生成小型模糊佔位圖
 * 
 * @param url - 圖片 URL（Strapi 圖片或本地路徑）
 * @returns 格式化的 blurDataURL，如果 url 無效則返回 undefined
 */
export function getBlurDataURL(url: string | undefined | null): string | undefined {
  if (!url) return undefined;

  // 如果是 Strapi 圖片（/uploads/ 開頭或完整 URL），透過 strapiImage 處理
  // 如果是本地路徑（如 /placeholder.png），直接使用
  const processedUrl = url.startsWith('/uploads/') || !url.startsWith('/')
    ? strapiImage(url)
    : url;

  return `/_next/image?url=${encodeURIComponent(processedUrl)}&w=32&q=2`;
}
