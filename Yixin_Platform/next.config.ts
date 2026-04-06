import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // 支援反向代理子路徑
  // basePath: 讓 Link 生成的 URL 包含 /proxy/3000 前綴
  // assetPrefix: 讓靜態資源使用完整 URL
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  // 允許 code-server 域名的跨域請求（用於 dev server 的圖片優化等 API）
  allowedDevOrigins: ['https://code.maxlin.tw'],
  // 參考 Next.js 官方 httpAgentOptions 範例，統一設定伺服器端 fetch 的 agent
  httpAgentOptions: {
    keepAlive: false,
  },
  // 優化資源載入
  experimental: {
    optimizePackageImports: ['lenis', '@gsap/react'],
  },
  // 圖片優化
  images: {
    // 當使用 assetPrefix（proxy 環境）時，使用自定義 loader 跳過 /_next/image
    ...(process.env.NEXT_PUBLIC_ASSET_PREFIX ? { loader: 'custom', loaderFile: './lib/image-loader.ts' } : {}),
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.yixin.art',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.yixin.art',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      }
    ],
  },
  // 減少不必要的預載
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // SVGR Configuration
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
      {
        test: /\.glsl$/,
        type: 'asset/source',
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
