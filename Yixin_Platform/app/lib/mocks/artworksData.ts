// Mock data for artworks
// 統一管理所有 Artworks 相關的假資料

export interface ArtworkMockData {
  id: number;
  documentId: string;
  title: string;
  publishDate: string; // 資料公開時間
  year: number; // 作品完成年份
  tags: string[];
  cover: {
    data: {
      url: string;
      alternativeText: string;
    }
  };
  artist: {
    name: string; // 創作者名稱
  }[];
}

// Artworks 假資料（用於 Scroller 和 Category Page）
export const artworksMockData: ArtworkMockData[] = [
  {
    id: 1,
    documentId: 'artwork-1',
    title: '山水系列：晨霧中的遠山',
    publishDate: '2023.05.15',
    year: 2022,
    tags: ['山水畫', '水墨', '風景', '當代水墨', '自然'],
    cover: {
      data: {
        url: 'https://picsum.photos/1200/600?random=101',
        alternativeText: '山水系列：晨霧中的遠山'
      }
    },
    artist: [{ name: '陳雅文' }]
  },
  {
    id: 2,
    documentId: 'artwork-2',
    title: '抽象構圖 No. 247',
    publishDate: '2022.08.22',
    year: 2021,
    tags: ['抽象', '幾何', '當代藝術', '色彩', '構圖'],
    cover: {
      data: {
        url: 'https://picsum.photos/800/800?random=102',
        alternativeText: '抽象構圖 No. 247'
      }
    },
    artist: [{ name: '李明哲' }]
  },
  {
    id: 3,
    documentId: 'artwork-3',
    title: '城市記憶：台北街景',
    publishDate: '2024.03.10',
    year: 2023,
    tags: ['城市', '街景', '油畫', '寫實', '台灣'],
    cover: {
      data: {
        url: 'https://picsum.photos/600/800?random=103',
        alternativeText: '城市記憶：台北街景'
      }
    },
    artist: [{ name: '王美麗' }]
  },
  {
    id: 4,
    documentId: 'artwork-4',
    title: '靜物：窗邊的花瓶',
    publishDate: '2021.11.28',
    year: 2020,
    tags: ['靜物', '花卉', '水彩', '古典', '寫生'],
    cover: {
      data: {
        url: 'https://picsum.photos/750/500?random=104',
        alternativeText: '靜物：窗邊的花瓶'
      }
    },
    artist: [{ name: '張靜宜' }]
  },
  {
    id: 5,
    documentId: 'artwork-5',
    title: '人像系列：凝視',
    publishDate: '2023.09.05',
    year: 2022,
    tags: ['人像', '肖像', '素描', '黑白', '情感'],
    cover: {
      data: {
        url: 'https://picsum.photos/500/800?random=105',
        alternativeText: '人像系列：凝視'
      }
    },
    artist: [{ name: '林國華' }]
  },
  {
    id: 6,
    documentId: 'artwork-6',
    title: '海洋之歌：浪花與礁石',
    publishDate: '2022.07.18',
    year: 2021,
    tags: ['海洋', '風景', '壓克力', '動態', '自然'],
    cover: {
      data: {
        url: 'https://picsum.photos/1000/500?random=106',
        alternativeText: '海洋之歌：浪花與礁石'
      }
    },
    artist: [{ name: '黃詩涵' }]
  },
  {
    id: 7,
    documentId: 'artwork-7',
    title: '幾何抽象：線條的對話',
    publishDate: '2024.01.25',
    year: 2023,
    tags: ['幾何', '抽象', '線條', '極簡', '當代'],
    cover: {
      data: {
        url: 'https://picsum.photos/600/600?random=107',
        alternativeText: '幾何抽象：線條的對話'
      }
    },
    artist: [{ name: '吳建宏' }]
  },
  {
    id: 8,
    documentId: 'artwork-8',
    title: '夜間城市：霓虹光影',
    publishDate: '2023.12.08',
    year: 2023,
    tags: ['夜景', '城市', '光影', '數位藝術', '現代'],
    cover: {
      data: {
        url: 'https://picsum.photos/900/600?random=108',
        alternativeText: '夜間城市：霓虹光影'
      }
    },
    artist: [{ name: '周文傑' }]
  },
  {
    id: 9,
    documentId: 'artwork-9',
    title: '花卉系列：春日綻放',
    publishDate: '2022.04.12',
    year: 2021,
    tags: ['花卉', '春天', '粉彩', '色彩', '自然'],
    cover: {
      data: {
        url: 'https://picsum.photos/600/900?random=109',
        alternativeText: '花卉系列：春日綻放'
      }
    },
    artist: [{ name: '鄭雅芳' }]
  },
  {
    id: 10,
    documentId: 'artwork-10',
    title: '記憶碎片：時光的痕跡',
    publishDate: '2024.06.30',
    year: 2024,
    tags: ['記憶', '拼貼', '混合媒材', '敘事', '當代'],
    cover: {
      data: {
        url: 'https://picsum.photos/700/700?random=110',
        alternativeText: '記憶碎片：時光的痕跡'
      }
    },
    artist: [{ name: '許志偉' }]
  },
  {
    id: 11,
    documentId: 'artwork-11',
    title: '書法藝術：行雲流水',
    publishDate: '2023.07.20',
    year: 2023,
    tags: ['書法', '傳統', '水墨', '文字藝術', '文化'],
    cover: {
      data: {
        url: 'https://picsum.photos/800/1000?random=111',
        alternativeText: '書法藝術：行雲流水'
      }
    },
    artist: [{ name: '劉書法' }]
  },
  {
    id: 12,
    documentId: 'artwork-12',
    title: '裝置藝術：空間的對話',
    publishDate: '2024.02.14',
    year: 2024,
    tags: ['裝置', '空間', '立體', '概念', '當代'],
    cover: {
      data: {
        url: 'https://picsum.photos/1000/800?random=112',
        alternativeText: '裝置藝術：空間的對話'
      }
    },
    artist: [{ name: '蔡空間' }]
  },
  {
    id: 13,
    documentId: 'artwork-13',
    title: '風景寫生：山間小徑',
    publishDate: '2022.10.03',
    year: 2022,
    tags: ['風景', '寫生', '油畫', '自然', '戶外'],
    cover: {
      data: {
        url: 'https://picsum.photos/900/700?random=113',
        alternativeText: '風景寫生：山間小徑'
      }
    },
    artist: [{ name: '楊風景' }]
  },
  {
    id: 14,
    documentId: 'artwork-14',
    title: '版畫系列：木刻印象',
    publishDate: '2021.12.25',
    year: 2021,
    tags: ['版畫', '木刻', '傳統', '黑白', '工藝'],
    cover: {
      data: {
        url: 'https://picsum.photos/600/800?random=114',
        alternativeText: '版畫系列：木刻印象'
      }
    },
    artist: [{ name: '趙版畫' }]
  },
  {
    id: 15,
    documentId: 'artwork-15',
    title: '數位創作：虛擬實境',
    publishDate: '2024.05.18',
    year: 2024,
    tags: ['數位', '虛擬', '科技', '互動', '未來'],
    cover: {
      data: {
        url: 'https://picsum.photos/1200/600?random=115',
        alternativeText: '數位創作：虛擬實境'
      }
    },
    artist: [{ name: '陳數位' }]
  },
  {
    id: 16,
    documentId: 'artwork-16',
    title: '雕塑作品：流動的形態',
    publishDate: '2023.11.12',
    year: 2023,
    tags: ['雕塑', '立體', '流動', '現代', '材質'],
    cover: {
      data: {
        url: 'https://picsum.photos/800/600?random=116',
        alternativeText: '雕塑作品：流動的形態'
      }
    },
    artist: [{ name: '孫雕塑' }]
  },
  {
    id: 17,
    documentId: 'artwork-17',
    title: '水彩畫：雨後的彩虹',
    publishDate: '2022.06.08',
    year: 2022,
    tags: ['水彩', '風景', '彩虹', '色彩', '自然'],
    cover: {
      data: {
        url: 'https://picsum.photos/700/900?random=117',
        alternativeText: '水彩畫：雨後的彩虹'
      }
    },
    artist: [{ name: '錢水彩' }]
  },
  {
    id: 18,
    documentId: 'artwork-18',
    title: '攝影藝術：街頭瞬間',
    publishDate: '2024.04.22',
    year: 2024,
    tags: ['攝影', '街頭', '瞬間', '黑白', '紀實'],
    cover: {
      data: {
        url: 'https://picsum.photos/1000/667?random=118',
        alternativeText: '攝影藝術：街頭瞬間'
      }
    },
    artist: [{ name: '李攝影' }]
  },
  {
    id: 19,
    documentId: 'artwork-19',
    title: '混合媒材：紙本與金屬',
    publishDate: '2023.08.30',
    year: 2023,
    tags: ['混合媒材', '紙本', '金屬', '實驗', '當代'],
    cover: {
      data: {
        url: 'https://picsum.photos/850/650?random=119',
        alternativeText: '混合媒材：紙本與金屬'
      }
    },
    artist: [{ name: '何媒材' }]
  },
  {
    id: 20,
    documentId: 'artwork-20',
    title: '抽象表現：情感的釋放',
    publishDate: '2024.01.15',
    year: 2024,
    tags: ['抽象', '表現', '情感', '色彩', '當代藝術'],
    cover: {
      data: {
        url: 'https://picsum.photos/750/750?random=120',
        alternativeText: '抽象表現：情感的釋放'
      }
    },
    artist: [{ name: '羅抽象' }]
  }
];

