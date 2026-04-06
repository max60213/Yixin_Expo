/**
 * Custom Image Loader for proxy environments
 * 當使用 reverse proxy 時，直接返回原始圖片 URL，跳過 /_next/image 優化
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function customImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // 如果是外部 URL，直接返回
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // 如果是相對路徑，加上 assetPrefix
  const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';
  return `${assetPrefix}${src}`;
}
