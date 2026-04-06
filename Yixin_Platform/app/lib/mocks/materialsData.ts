// Mock data for materials
// 統一管理所有 Materials 相關的假資料

export interface MaterialMockData {
  id: number;
  documentId: string;
  name: string; // 媒材名稱
  description: string; // 媒材描述
  artworkCount: number; // 使用此媒材的作品數量
  cover: {
    url: string;
    alternativeText: string;
  };
  tags: string[];
}

// Materials 假資料（用於 Scroller 和 Category Page）
export const materialsMockData: MaterialMockData[] = [
  {
    id: 1,
    documentId: 'material-1',
    name: '油畫',
    description: '使用油性顏料在畫布上創作',
    artworkCount: 328,
    cover: {
      url: 'https://picsum.photos/800/600?random=201',
      alternativeText: '油畫媒材'
    },
    tags: ['經典', '傳統', '豐富色彩']
  },
  {
    id: 2,
    documentId: 'material-2',
    name: '水墨',
    description: '使用墨汁與水在宣紙上創作',
    artworkCount: 256,
    cover: {
      url: 'https://picsum.photos/900/600?random=202',
      alternativeText: '水墨媒材'
    },
    tags: ['東方', '寫意', '傳統']
  },
  {
    id: 3,
    documentId: 'material-3',
    name: '壓克力',
    description: '快乾且色彩鮮豔的現代顏料',
    artworkCount: 412,
    cover: {
      url: 'https://picsum.photos/700/600?random=203',
      alternativeText: '壓克力媒材'
    },
    tags: ['現代', '快乾', '鮮豔']
  },
  {
    id: 4,
    documentId: 'material-4',
    name: '水彩',
    description: '透明輕盈的水性顏料創作',
    artworkCount: 189,
    cover: {
      url: 'https://picsum.photos/800/700?random=204',
      alternativeText: '水彩媒材'
    },
    tags: ['透明', '輕盈', '清新']
  },
  {
    id: 5,
    documentId: 'material-5',
    name: '素描',
    description: '使用鉛筆或炭筆的基礎繪畫',
    artworkCount: 167,
    cover: {
      url: 'https://picsum.photos/600/800?random=205',
      alternativeText: '素描媒材'
    },
    tags: ['基礎', '黑白', '線條']
  },
  {
    id: 6,
    documentId: 'material-6',
    name: '版畫',
    description: '透過印刷技術創作的藝術形式',
    artworkCount: 143,
    cover: {
      url: 'https://picsum.photos/750/600?random=206',
      alternativeText: '版畫媒材'
    },
    tags: ['複製', '印刷', '獨特']
  },
  {
    id: 7,
    documentId: 'material-7',
    name: '混合媒材',
    description: '結合多種材料與技法創作',
    artworkCount: 298,
    cover: {
      url: 'https://picsum.photos/800/800?random=207',
      alternativeText: '混合媒材'
    },
    tags: ['實驗', '創新', '多元']
  },
  {
    id: 8,
    documentId: 'material-8',
    name: '數位藝術',
    description: '使用數位工具與軟體創作',
    artworkCount: 524,
    cover: {
      url: 'https://picsum.photos/900/700?random=208',
      alternativeText: '數位藝術媒材'
    },
    tags: ['科技', '現代', '無限可能']
  },
  {
    id: 9,
    documentId: 'material-9',
    name: '雕塑',
    description: '三維立體的藝術創作形式',
    artworkCount: 201,
    cover: {
      url: 'https://picsum.photos/600/900?random=209',
      alternativeText: '雕塑媒材'
    },
    tags: ['立體', '空間', '造型']
  },
  {
    id: 10,
    documentId: 'material-10',
    name: '攝影',
    description: '透過相機捕捉瞬間的藝術',
    artworkCount: 687,
    cover: {
      url: 'https://picsum.photos/1000/600?random=210',
      alternativeText: '攝影媒材'
    },
    tags: ['紀實', '瞬間', '光影']
  }
];

