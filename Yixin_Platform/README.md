# 🎨 Yixin Platform 藝信平台

藝信平台是一個用於展現與管理藝術品的數位系統，核心目標是將藝術品相關的各類資訊進行結構化保存、關聯與清楚呈現。透過藝信平台，使用者可以一目了然地查詢畫廊所擁有的藝術品、曾舉辦的展覽活動，以及各活動中所包含的藝術品內容，讓原本分散且複雜的藝術資料關係得以被有效整理與瀏覽。

此外，藝信平台亦著重於藝術品歷程的可追溯性。對於有進行記錄的藝術品，平台會完整保存其各個階段的紀錄，包含展出、運送、交易等過程，並將關鍵步驟上鏈保存。使用者可於藝信平台上集中查看藝術品的完整歷史紀錄，作為展示、研究與驗證的重要依據。

> 基於 Next.js 15 建構，提供藝術家、畫廊與收藏家的完整數位生態系統。

## ✨ 主要功能

- **Next.js 15** - 最新的 React 框架，支援 App Router
- **React 19** - 最新的 React 版本，包含新特性和優化
- **TypeScript** - 完整的類型安全支援
- **Tailwind CSS 4** - 現代化的 CSS 框架
- **國際化支援** - 使用 `next-intl` 進行多語言支援
- **Headless CMS** - 整合 `Strapi`，完整的內容管理系統
- **使用者認證** - 整合 `NextAuth.js`，支援 OAuth 登入
- **GSAP 動畫** - 專業級動畫函式庫，支援複雜動畫序列和滾動觸發
- **Swiper** - 現代化輪播元件
- **Masonry 佈局** - 支援瀑布流圖片展示

## ️ 技術棧

### 核心框架
- **Next.js** `15.4.6` - React 全端框架
- **React** `^19.1.0` - 使用者介面函式庫
- **TypeScript** `^5` - 靜態類型檢查

### 樣式與 UI
- **Tailwind CSS** `^4` - 實用優先的 CSS 框架
- **Material Symbols** `^0.38.0` - Google Material Icons
- **PostCSS** - CSS 後處理器
  - `postcss-import` - CSS 導入支援
  - `postcss-mixins` - CSS 混入功能
  - `postcss-nested` - 巢狀 CSS 支援

### 動畫與互動
- **GSAP** `^2.1.2` - 專業級動畫函式庫
- **React Spring** `^10.0.3` - 物理動畫函式庫
- **Swiper** `^12.0.3` - 現代化觸控滑動元件

### 使用者認證
- **NextAuth.js** `^4.24.13` - 完整的認證解決方案

### 資料管理
- **TanStack Query** `^5` - 伺服器狀態管理（用於無限滾動）
- **Axios** `^1.13.2` - HTTP 客戶端

### 國際化
- **next-intl** `^4.3.4` - Next.js 國際化解決方案

### 資料來源
- **Strapi CMS** - Headless CMS，提供內容管理與 API 供應

### 佈局與展示
- **Masonic** `^4.1.0` - 虛擬化 Masonry 佈局
- **React Masonry CSS** `^1.0.16` - CSS Grid Masonry 佈局
- **React Loading Skeleton** `^3.5.0` - 骨架載入效果

### 其他工具
- **Avvvatars** `^0.4.2` - 動態頭像產生器
- **Strapi Blocks Renderer** `^1.0.2` - Strapi Rich Text 渲染器

### 開發工具
- **ESLint** `^9` - 程式碼品質檢查
- **SVGR** `^8.1.0` - SVG 轉 React 元件
- **Autoprefixer** `^10.4.21` - CSS 瀏覽器前綴自動添加

## 🚀 快速開始

### 前置需求
- Node.js 18+ 
- npm 或 yarn

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```
專案將在 [http://localhost:3000](http://localhost:3000) 啟動。

### 建置專案
```bash
npm run build
```

### 啟動生產環境
```bash
npm start
```

### 程式碼檢查
```bash
npm run lint
```

## 🧰 Strapi CMS 整合

本專案已與 Strapi CMS 深度整合，提供完整的內容管理功能。

### 1) 環境變數

請新增 `.env` 檔案並設定相關環境變數（參考 `.env.example`）：

```bash
# CMS API URL
NEXT_PUBLIC_API_URL=http://localhost:1337

# NextAuth 設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### 2) 圖片網域白名單

若你使用 CMS 上傳圖片，需要允許圖片網域：

```ts
// next.config.ts（節錄）
images: {
  remotePatterns: [
    { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/uploads/**' },
    { protocol: 'https', hostname: 'cms.your-domain.com', pathname: '/uploads/**' },
  ],
},
```

### 3) 主要內容類型

本專案支援以下 Strapi 內容類型：
- **Artwork** - 藝術作品
- **Artist** - 藝術家
- **Gallery** - 畫廊
- **Event** - 活動
- **Insight** - 文章/洞察
- **Material** - 媒材分類
- **Featured** - 精選輪播

### 4) 部署與最佳化

- 建議於生產環境設置合理的 `Cache-Control` 與 Next.js `revalidate` 以減少 API 壓力
- 若有自訂網域的 CMS 圖片，請記得同步更新 `next.config.ts` 的 `images.remotePatterns`
- 需跨網域時，請於 Strapi 設定 CORS 允許你的前端網域

## 📁 專案結構

```
yixin-platform/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 根佈局
│   ├── globals.css               # 全域樣式
│   ├── breakpoints.css           # 響應式斷點定義
│   ├── typography.css            # 排版樣式
│   │
│   ├── [locale]/                 # 國際化路由層級
│   │   ├── layout.tsx            # 區域佈局
│   │   ├── page.tsx              # 首頁
│   │   ├── artworks/             # 藝術作品頁面（含詳情頁）
│   │   ├── artists/              # 藝術家頁面
│   │   ├── galleries/            # 畫廊頁面
│   │   ├── events/               # 活動頁面
│   │   ├── insights/             # 文章頁面
│   │   ├── explore/              # 探索頁面
│   │   ├── search/               # 搜尋頁面
│   │   ├── profile/              # 個人資料頁面
│   │   ├── home/                 # 首頁相關子頁面
│   │   ├── auth/                 # 認證相關頁面
│   │   │   ├── login/            # 登入
│   │   │   └── signup/           # 註冊
│   │   └── [category]/           # 動態分類頁面
│   │
│   ├── api/                      # API 路由
│   │   ├── auth/                 # NextAuth 認證 API
│   │   └── [contentType]/        # 動態內容 API
│   │
│   ├── components/               # 共用元件
│   │   ├── app-bar/              # 應用程式導航列
│   │   ├── artworks-masonry/     # 作品瀑布流佈局
│   │   ├── collection-page/      # 收藏頁面元件
│   │   ├── content-card/         # 內容卡片
│   │   ├── info-card/            # 資訊卡片
│   │   ├── modal/                # 彈窗元件
│   │   ├── navigation/           # 導航元件
│   │   ├── scroller/             # 水平滾動元件
│   │   ├── form/                 # 表單元件
│   │   ├── utilities/            # 工具元件
│   │   ├── Carousel.tsx          # 首頁輪播元件
│   │   ├── Owner.tsx             # 所有權展示元件
│   │   ├── SmartCertificate.tsx  # 智慧證書元件
│   │   ├── SectionHeader.tsx     # 區塊標題元件
│   │   └── ...
│   │
│   ├── context/                  # React Context
│   │   ├── collectionsContext.tsx # 收藏狀態管理
│   │   └── navContext.tsx        # 導航狀態管理
│   │
│   ├── hooks/                    # 自訂 Hooks
│   │   ├── useAuth.ts            # 認證邏輯
│   │   ├── useBreakpoints.ts     # 響應式斷點
│   │   ├── useInfiniteScroll.ts  # 無限滾動
│   │   └── useModal.ts           # 彈窗控制
│   │
│   ├── lib/                      # 工具函式與資料層
│   │   ├── auth/                 # 認證相關
│   │   ├── model/                # 資料模型與類型
│   │   ├── strapi/               # Strapi API 介接
│   │   ├── mocks/                # Mock 資料
│   │   ├── shared/               # 共用工具
│   │   ├── iconMapper.ts         # 圖示對應
│   │   ├── cardFactory.ts        # 卡片工廠函式
│   │   └── breakpoints.ts        # 斷點常數
│   │
│   ├── providers/                # Provider 元件
│   │   ├── providers.tsx         # 統一 Provider 包裝
│   │   ├── QueryProvider.tsx     # TanStack Query Provider
│   │   └── authProvider.tsx      # 認證 Provider
│   │
│   └── templates/                # 頁面模板
│       ├── ProfilePage.tsx       # 個人資料頁模板
│       └── profile-page/         # 個人資料頁子元件
│
├── i18n/                         # 國際化配置
│   ├── navigation.ts             # 導航路由配置
│   ├── request.ts                # 請求配置
│   └── routing.ts                # 路由配置
│
├── lib/                          # 根層級工具函式
│   └── image-loader.ts           # 圖片載入器
│
├── messages/                     # 多語言訊息
│   ├── en.json                   # 英文
│   └── zh-TW.json                # 繁體中文
│
├── public/                       # 靜態資源
│   ├── favicon/                  # 網站圖示
│   ├── icon/                     # 應用程式圖示
│   └── *.svg, *.png              # Logo 與預設圖片
│
├── types/                        # TypeScript 類型定義
│   └── next-auth.d.ts            # NextAuth 類型擴展
│
├── .agent/                       # AI 工作流程配置
│   └── workflows/                # 工作流程定義
│
├── package.json                  # 專案依賴
├── next.config.ts                # Next.js 配置
├── postcss.config.mjs            # PostCSS 配置
├── tsconfig.json                 # TypeScript 配置
├── eslint.config.mjs             # ESLint 配置
├── middleware.ts                 # 國際化中間件
├── svgr.d.ts                     # SVGR 類型定義
└── README.md                     # 專案說明
```

## 🎯 使用指南

### 添加新頁面
在 `app/[locale]/` 目錄下創建新的資料夾和 `page.tsx` 檔案：
```tsx
// app/[locale]/example/page.tsx
export default function ExamplePage() {
  return <div>範例頁面</div>
}
```

### 使用 Tailwind CSS
直接在 JSX 中使用 Tailwind 類別：
```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  <h1 className="text-4xl font-bold text-white">Hello World</h1>
</div>
```

### 添加動畫
使用 GSAP 創建流暢動畫：
```tsx
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

export default function AnimatedComponent() {
  useGSAP(() => {
    gsap.from('.animate-me', { opacity: 0, y: 50, duration: 1 })
  })

  return <div className="animate-me">動畫內容</div>
}
```

### 國際化
使用 `next-intl` 進行多語言支援：
```tsx
import { useTranslations } from 'next-intl'

export default function LocalizedComponent() {
  const t = useTranslations('common')
  return <h1>{t('title')}</h1>
}
```

### 使用者認證
使用 NextAuth.js 處理登入狀態：
```tsx
import { useSession } from 'next-auth/react'

export default function AuthComponent() {
  const { data: session } = useSession()
  
  if (session) {
    return <p>已登入：{session.user?.name}</p>
  }
  return <p>尚未登入</p>
}
```

## 🔧 配置說明

### Next.js 配置
專案使用預設的 Next.js 配置，你可以根據需求在 `next.config.ts` 中進行調整。

### Tailwind CSS 配置
Tailwind CSS 4 已預配置，支援最新的 CSS 功能。

### TypeScript 配置
TypeScript 已配置為嚴格模式，確保程式碼品質。


---

**Yixin Platform - 連結藝術與收藏的橋樑**
