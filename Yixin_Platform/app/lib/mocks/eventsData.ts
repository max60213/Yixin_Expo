// Mock data for events
// 統一管理所有 Events 相關的假資料
// 未來可以在這個目錄下新增其他假資料檔案，例如：artwork.ts, artist.ts 等

export interface EventMockData {
  id: number;
  documentId: string;
  title: string;
  publishDate: string;
  tags: string[];
  cover: {
    url: string;
    alternativeText: string;
  };
  gallery: {
    name: string;
  }[];
}

// Events 假資料（用於 Scroller 和 Category Page）
export const eventsMockData: EventMockData[] = [
  {
    id: 1,
    documentId: 'event-1',
    title: '【2025台北藝博】誤讀或是無聲地凝視 — 郭秉恩 × 弎畫廊 MIT 特展',
    publishDate: '2025.01.15',
    tags: ['台北藝博', '特展', '郭秉恩', '弎畫廊', 'MIT', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=1',
      alternativeText: '2025台北藝博'
    },
    gallery: [{ name: 'Yixin' }]
  },
  {
    id: 2,
    documentId: 'event-2',
    title: '拍賣焦點：趙無極晚期抽象畫作專場',
    publishDate: '2025.01.14',
    tags: ['拍賣', '趙無極', '抽象畫', '專場', '現代藝術', '大師'],
    cover: {
      url: 'https://picsum.photos/800/400?random=2',
      alternativeText: '當代藝術展'
    },
    gallery: [{ name: 'Auction' }]
  },
  {
    id: 3,
    documentId: 'event-3',
    title: '「記憶的風景」— 台灣新生代藝術家聯展正式開幕',
    publishDate: '2025.01.13',
    tags: ['聯展', '新生代', '台灣藝術', '開幕展', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=3',
      alternativeText: '畫廊開幕'
    },
    gallery: [{ name: 'Gallery' }]
  },
  {
    id: 4,
    documentId: 'event-4',
    title: '首爾雙年展 2025：亞洲當代藝術的跨文化對話',
    publishDate: '2025.01.12',
    tags: ['雙年展', '首爾', '亞洲', '當代藝術', '國際', '跨文化'],
    cover: {
      url: 'https://picsum.photos/800/400?random=4',
      alternativeText: '國際藝術'
    },
    gallery: [{ name: 'Event' }]
  },
  {
    id: 5,
    documentId: 'event-5',
    title: '收藏家講座：藝術品鑒定與市場趨勢深度解析',
    publishDate: '2025.01.11',
    tags: ['講座', '收藏家', '藝術品鑒定', '市場趨勢', '教育'],
    cover: {
      url: 'https://picsum.photos/800/400?random=5',
      alternativeText: '收藏家聚會'
    },
    gallery: [{ name: 'Collector' }]
  },
  {
    id: 6,
    documentId: 'event-6',
    title: 'NFT × 實體藝術融合展 — 探索區塊鏈下的藝術創作',
    publishDate: '2025.01.10',
    tags: ['NFT', '數位藝術', '區塊鏈', '融合展', '創新', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=6',
      alternativeText: '數位藝術'
    },
    gallery: [{ name: 'Digital' }]
  },
  {
    id: 7,
    documentId: 'event-7',
    title: '【2025台北藝博】誤讀或是無聲地凝視 — 郭秉恩 × 弎畫廊 MIT 特展',
    publishDate: '2025.01.15',
    tags: ['台北藝博', '特展', '郭秉恩', '弎畫廊', 'MIT', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=1',
      alternativeText: '2025台北藝博'
    },
    gallery: [{ name: 'Avocado' }]
  },
  {
    id: 8,
    documentId: 'event-8',
    title: '拍賣焦點：趙無極晚期抽象畫作專場',
    publishDate: '2025.01.14',
    tags: ['拍賣', '趙無極', '抽象畫', '專場', '現代藝術', '大師'],
    cover: {
      url: 'https://picsum.photos/800/400?random=2',
      alternativeText: '當代藝術展'
    },
    gallery: [{ name: 'Auction' }]
  },
  {
    id: 9,
    documentId: 'event-9',
    title: '「記憶的風景」— 台灣新生代藝術家聯展正式開幕',
    publishDate: '2025.01.13',
    tags: ['聯展', '新生代', '台灣藝術', '開幕展', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=3',
      alternativeText: '畫廊開幕'
    },
    gallery: [{ name: 'Gallery' }]
  },
  {
    id: 10,
    documentId: 'event-10',
    title: '首爾雙年展 2025：亞洲當代藝術的跨文化對話',
    publishDate: '2025.01.12',
    tags: ['雙年展', '首爾', '亞洲', '當代藝術', '國際', '跨文化'],
    cover: {
      url: 'https://picsum.photos/800/400?random=4',
      alternativeText: '國際藝術'
    },
    gallery: [{ name: 'Event' }]
  },
  {
    id: 11,
    documentId: 'event-11',
    title: '收藏家講座：藝術品鑒定與市場趨勢深度解析',
    publishDate: '2025.01.11',
    tags: ['講座', '收藏家', '藝術品鑒定', '市場趨勢', '教育'],
    cover: {
      url: 'https://picsum.photos/800/400?random=5',
      alternativeText: '收藏家聚會'
    },
    gallery: [{ name: 'Collector' }]
  },
  {
    id: 12,
    documentId: 'event-12',
    title: 'NFT × 實體藝術融合展 — 探索區塊鏈下的藝術創作',
    publishDate: '2025.01.10',
    tags: ['NFT', '數位藝術', '區塊鏈', '融合展', '創新', '當代藝術'],
    cover: {
      url: 'https://picsum.photos/800/400?random=6',
      alternativeText: '數位藝術'
    },
    gallery: [{ name: 'Digital' }]
  }
];

