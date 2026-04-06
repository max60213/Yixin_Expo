# Yixin Platform 專案結構文件

> 最後更新：2025-12-13

## 目錄

1. [專案概述](#專案概述)
2. [技術棧](#技術棧)
3. [目錄結構](#目錄結構)
4. [路由設計](#路由設計)
5. [資料流與架構模式](#資料流與架構模式)
6. [核心模組說明](#核心模組說明)

---

## 專案概述

Yixin Platform 是一個藝術品展示與管理平台，採用 Next.js 15 App Router 架構，支援國際化（i18n），並整合 Strapi CMS 作為後端資料來源。

---

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 語言 | TypeScript |
| 樣式 | CSS Modules / 原生 CSS |
| 國際化 | next-intl |
| CMS | Strapi (外部 API) |
| 認證 | 自訂 Auth Provider |

---

## 目錄結構

```
Yixin_Platform/
├── app/                          # Next.js App Router 主目錄
│   ├── [locale]/                 # 國際化路由 (en, zh-TW 等)
│   │   ├── layout.tsx            # Locale Layout (AppBar, Navigation, Providers)
│   │   ├── page.tsx              # 首頁
│   │   ├── artworks/             # 🎨 Artworks 獨立路由
│   │   │   ├── page.tsx          # 作品列表 (Masonry)
│   │   │   └── [slug]/           # 作品詳情
│   │   │       ├── page.tsx      # 作品詳情頁
│   │   │       ├── artwork.css   # 作品頁樣式
│   │   │       └── activities/   # 作品活動紀錄
│   │   ├── [category]/           # 動態分類路由 (events, artists, galleries, materials)
│   │   │   ├── page.tsx          # 分類列表頁
│   │   │   ├── category.css      # 分類頁樣式
│   │   │   └── [slug]/           # 分類詳情頁
│   │   │       └── page.tsx      # 詳情頁 (使用 detailMapping)
│   │   ├── auth/                 # 認證相關頁面
│   │   │   ├── login/            # 登入
│   │   │   ├── signup/           # 註冊
│   │   │   ├── confirm/          # 確認
│   │   │   └── success/          # 成功頁
│   │   ├── explore/              # 探索頁
│   │   ├── profile/              # 個人資料頁
│   │   ├── search/               # 搜尋頁
│   │   └── home/                 # 首頁相關資源
│   ├── api/                      # API Routes
│   │   ├── [contentType]/        # 動態 Content Type API
│   │   └── auth/                 # 認證 API
│   ├── components/               # 共用元件
│   │   ├── app-bar/              # 應用程式頂部導覽列
│   │   ├── artworks-masonry/     # 作品瀑布流元件
│   │   ├── category/             # 分類相關元件
│   │   │   ├── Header.tsx        # 分類頁 Header
│   │   │   └── artwork/          # 作品詳情子元件
│   │   ├── content-card/         # 內容卡片 (ArtworkCard, EventCard 等)
│   │   ├── scroller/             # 橫向捲動元件
│   │   ├── navigation/           # 導覽元件
│   │   ├── modal/                # Modal 元件
│   │   └── ...                   # 其他共用元件
│   ├── context/                  # React Context
│   │   ├── authProvider.tsx      # 認證 Context
│   │   ├── navContext.tsx        # 導覽 Context
│   │   └── providers.tsx         # 複合 Provider
│   ├── hooks/                    # 自訂 Hooks
│   ├── lib/                      # 工具函式與資料層
│   │   ├── category/             # 分類相關映射
│   │   │   ├── listMapping.ts    # 列表頁 Query/Mapper 映射
│   │   │   └── detailMapping.ts  # 詳情頁 Template 映射
│   │   ├── model/                # 資料模型與型別定義
│   │   │   ├── artwork.ts        # Artwork 型別與 Query
│   │   │   ├── event.ts          # Event 型別與 Query
│   │   │   ├── artist.ts         # Artist 型別
│   │   │   ├── gallery.ts        # Gallery 型別與 Query
│   │   │   ├── material.ts       # Material 型別
│   │   │   └── ...               # 其他模型
│   │   ├── strapi/               # Strapi API 工具
│   │   │   ├── client.ts         # API Client
│   │   │   └── fetchContentType.ts # 通用資料獲取函式
│   │   ├── cardFactory.ts        # Card 元件工廠
│   │   ├── dataFactory.ts        # 資料工廠
│   │   └── profile/              # Profile 相關資料獲取
│   └── templates/                # 頁面模板
│       ├── EventPage.tsx         # 活動詳情模板
│       ├── ProfilePage.tsx       # Profile 頁面模板
│       └── profile-page/         # Profile 子元件
├── i18n/                         # 國際化配置
│   ├── routing.ts                # 路由配置
│   ├── navigation.ts             # 導覽配置
│   └── request.ts                # 請求配置
├── messages/                     # 翻譯檔案
│   ├── en.json                   # 英文
│   └── zh-TW.json                # 繁體中文
├── public/                       # 靜態資源
├── middleware.ts                 # Next.js Middleware (i18n)
└── next.config.ts                # Next.js 配置
```

---

## 路由設計

### 路由層級結構

```
/[locale]                         # 國際化前綴 (en, zh-TW)
│
├── /                             # 首頁
│   └── page.tsx                  # Carousel + Events + Artworks Masonry
│
├── /artworks                     # 🎨 作品 (獨立路由)
│   ├── /                         # 作品列表 (Masonry 瀑布流)
│   └── /[slug]                   # 作品詳情頁
│       └── /activities           # 作品活動紀錄
│
├── /[category]                   # 通用分類路由
│   │                             # 支援: events, artists, galleries, materials
│   ├── /                         # 分類列表頁
│   └── /[slug]                   # 分類詳情頁
│
├── /explore                      # 探索頁
├── /search                       # 搜尋頁
├── /profile                      # 個人資料
│
└── /auth                         # 認證
    ├── /login                    # 登入
    ├── /signup                   # 註冊
    ├── /confirm                  # 確認
    └── /success                  # 成功
```

### 路由優先級說明

Next.js App Router 的路由匹配優先級：

1. **靜態路由** (如 `/artworks`, `/explore`) 優先於動態路由
2. **`/artworks`** 會匹配 `app/[locale]/artworks/page.tsx`
3. **`/events`** 會匹配 `app/[locale]/[category]/page.tsx` (category = "events")

這種設計讓 `artworks` 可以有獨立的渲染邏輯（Masonry 瀑布流），而其他分類共用通用的 Grid 佈局。

### 詳細路由說明

#### 1. 首頁 (`/[locale]/page.tsx`)

```
URL: /en 或 /zh-TW
```

- 顯示 Carousel 輪播
- Events Section (橫向捲動)
- Artworks Masonry (瀑布流)
- 使用 `Suspense` 實現漸進式載入

#### 2. Artworks 路由 (獨立實作)

```
列表: /en/artworks
詳情: /en/artworks/[documentId]
活動: /en/artworks/[documentId]/activities
```

| 路由 | 檔案位置 | 說明 |
|------|----------|------|
| `/artworks` | `artworks/page.tsx` | 使用 `ArtworksMasonry` 瀑布流渲染 |
| `/artworks/[slug]` | `artworks/[slug]/page.tsx` | 完整作品詳情，包含圖片查看器、詳細資訊、活動紀錄、相關作品 |

**特色：**
- 獨立的頁面實作，不經過 `detailMapping.ts`
- 使用專屬的 CSS (`artwork.css`)
- 專屬元件位於 `components/category/artwork/`

#### 3. 通用分類路由 (`/[locale]/[category]/`)

```
列表: /en/events, /en/artists, /en/galleries, /en/materials
詳情: /en/events/[slug], /en/artists/[slug], /en/galleries/[slug]
```

| Category | 列表渲染方式 | 詳情模板 |
|----------|-------------|---------|
| `events` | Grid (標準 Strapi endpoint) | `EventPage` |
| `artists` | Grid (custom endpoint: `artist-list`) | `ProfilePage` |
| `galleries` | Grid (custom endpoint) | `ProfilePage` |
| `materials` | Grid (custom endpoint: `material-list`) | - |

**列表頁邏輯 (`[category]/page.tsx`)：**

```typescript
// Custom Endpoint Categories (materials, artists, galleries)
if (category in CUSTOM_ENDPOINT_CONFIGS) {
  // 使用自訂 API endpoint
}

// Standard Strapi Categories (events 等)
// 使用 getCategoryQuery() 和 getCategoryMapper()
```

**詳情頁邏輯 (`[category]/[slug]/page.tsx`)：**

```typescript
// 使用 detailMapping.ts 取得對應 Template
const Template = getDetailTemplate(category);

// Artists: 獲取 profile + artworks + events
// Galleries: 獲取 profile + artworks + events + artists
// Events: 直接渲染 EventPage template
```

#### 4. 其他路由

| 路由 | 說明 |
|------|------|
| `/explore` | 探索頁（材質分類展示） |
| `/search` | 搜尋功能 |
| `/profile` | 登入用戶的個人資料 |
| `/auth/*` | 認證流程頁面 |

---

## 資料流與架構模式

### 資料獲取流程

```
┌─────────────────────────────────────────────────────────────┐
│                        Page Component                        │
│                    (Server Component)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    fetchContentType()                        │
│              app/lib/strapi/fetchContentType.ts              │
│                                                             │
│  • 接受 contentType 和 query params                          │
│  • 使用 ISR (revalidate: 60 秒)                              │
│  • 返回 Strapi 格式的資料                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        fetchAPI()                            │
│                  app/lib/strapi/client.ts                    │
│                                                             │
│  • 構建 Strapi API URL                                       │
│  • 處理認證 Token                                            │
│  • 錯誤處理                                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Strapi CMS API                          │
│                  (External Backend)                          │
└─────────────────────────────────────────────────────────────┘
```

### Mapping 模式

專案使用 Mapping 模式來解耦分類與其對應的實作：

#### listMapping.ts (列表頁)

```typescript
// Query 配置映射
categoryQueryMapping = {
  events: EVENT_LIST_QUERY,
  artworks: ARTWORK_LIST_QUERY,
}

// Mapper 函式映射
categoryMapperMapping = {
  events: mapEventListItem,
  artworks: mapArtworkListItem,
}
```

#### detailMapping.ts (詳情頁)

```typescript
// Template 映射 (注意：artworks 已移至獨立路由)
detailTemplateMapping = {
  events: EventPage,
  artists: ProfilePage,
  galleries: ProfilePage,
}
```

### Card Factory 模式

`cardFactory.ts` 提供根據分類返回對應 Card 元件的工廠函式：

```typescript
getCardComponent('artworks')  // → ArtworkCard
getCardComponent('events')    // → EventCard
getCardComponent('artists')   // → ArtistCard
getCardComponent('galleries') // → GalleryCard
```

---

## 核心模組說明

### 1. ArtworksMasonry

位置: `app/components/artworks-masonry/`

瀑布流作品展示元件，支援：
- 無限捲動載入
- Skeleton 載入狀態
- 響應式欄位數量

### 2. Scroller

位置: `app/components/scroller/`

橫向捲動展示元件，用於：
- 首頁的 Events Section
- 詳情頁的相關內容展示

### 3. Templates

位置: `app/templates/`

頁面模板，提供一致的頁面佈局：

| 模板 | 用途 |
|------|------|
| `ProfilePage` | 藝術家、畫廊的 Profile 頁面 |
| `EventPage` | 活動詳情頁面 |

### 4. Content Cards

位置: `app/components/content-card/`

各類內容的卡片元件：
- `ArtworkCard` - 作品卡片
- `EventCard` - 活動卡片
- `GalleryCard` - 畫廊卡片
- `ArtistCard` - 藝術家卡片

---

## 國際化 (i18n)

使用 `next-intl` 實現：

- **Middleware**: 攔截請求，處理 locale 前綴
- **Messages**: 翻譯檔案位於 `messages/` 目錄
- **Routing**: 所有頁面路由都包含 `[locale]` 參數

支援語系：
- `en` - English
- `zh-TW` - 繁體中文

---

## 未來擴展建議

1. **新增分類**：在 `listMapping.ts` 和 `detailMapping.ts` 添加對應映射
2. **新增模板**：在 `templates/` 創建新模板，並在 `detailMapping.ts` 註冊
3. **新增 Card**：在 `content-card/` 創建元件，並在 `cardFactory.ts` 註冊
