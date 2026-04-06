/**
 * Mock Data - 作品活動頁面假資料
 * 
 * 此檔案為暫時使用的假資料，之後會從 API 取得真實資料
 */

// ========== Types ==========

export interface BlockchainInfo {
  block: string;
  transaction: string;
  commitment: string;
  note: string;
}

export interface ActivityRecord {
  id: number;
  title: string;
  date: string;
  time: string;
  icon: string;
  expanded: boolean;
  blockchain?: BlockchainInfo;
}

export interface PastOwner {
  id: number;
  address: string;      // 錢包地址（區塊鏈原生資料）
  name?: string;        // 顯示名稱（由 ENS 解析或平台資料庫查詢，非區塊鏈原生）
  acquiredAt: string;   // 取得時間戳記（區塊鏈原生資料）
  txHash: string;       // 交易雜湊（區塊鏈原生資料）
}

// ========== Mock Data ==========

export const mockRecords: ActivityRecord[] = [
  {
    id: 1,
    title: '所有權轉移',
    date: '2025.01.28',
    time: '14:32:18',
    icon: 'approval_delegation',
    expanded: true,
    blockchain: {
      block: '20,312,884',
      transaction: '0xb1f3…9ac7',
      commitment: '0x4e7c…12af',
      note: '轉移時自動產生快照並上鏈新版本 (T3)',
    },
  },
  {
    id: 2,
    title: '台北當代藝術館展出',
    date: '2025.01.15',
    time: '10:15:42',
    icon: 'museum', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,756',
      transaction: '0xa2e4…8bd6',
      commitment: '0x5f8d…23be',
      note: '展出期間狀態記錄上鏈 (E2)',
    },
  },
  {
    id: 3,
    title: '運送至台北當代藝術館',
    date: '2025.01.12',
    time: '09:28:15',
    icon: 'delivery_truck_speed', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,689',
      transaction: '0xc3f5…9ce7',
      commitment: '0x6e9f…34cf',
      note: '運送過程狀態追蹤記錄 (S1)',
    },
  },
  {
    id: 4,
    title: '作品驗證',
    date: '2025.01.08',
    time: '16:45:33',
    icon: 'dropper_eye', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,542',
      transaction: '0xd4a6…0de8',
      commitment: '0x7f0a…45df',
      note: '驗證通過，作品資訊確認上鏈 (V2)',
    },
  },
  {
    id: 6,
    title: '所有權轉移',
    date: '2024.12.20',
    time: '13:55:29',
    icon: 'approval_delegation',
    expanded: false,
    blockchain: {
      block: '20,312,298',
      transaction: '0xf6c8…2f0a',
      commitment: '0x9b2c…67f0',
      note: '轉移時自動產生快照並上鏈新版本 (T2)',
    },
  },
  {
    id: 7,
    title: '松山文創園區展出',
    date: '2024.12.10',
    time: '15:18:56',
    icon: 'museum', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,187',
      transaction: '0xa7d9…3e1b',
      commitment: '0xac3d…78f1',
      note: '展出期間狀態記錄上鏈 (E1)',
    },
  },
  {
    id: 8,
    title: '運送至松山文創園區',
    date: '2024.12.08',
    time: '08:42:11',
    icon: 'delivery_truck_speed', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,134',
      transaction: '0xb8ea…4f2c',
      commitment: '0xbd4e…89f2',
      note: '運送過程狀態追蹤記錄 (S0)',
    },
  },
  {
    id: 5,
    title: '初次採證',
    date: '2025.01.05',
    time: '11:20:07',
    icon: 'biotech', // TODO: 填入對應的 Material Symbol 圖示名稱
    expanded: false,
    blockchain: {
      block: '20,312,421',
      transaction: '0xe5b7…1ef9',
      commitment: '0x8a1b…56ef',
      note: '初始採證資料上鏈存證 (C1)',
    },
  },
];

export const mockPastOwners: PastOwner[] = [
  {
    id: 1,
    address: '0x7a23...b4c1',
    // 此地址未在平台註冊，也沒有 ENS
    acquiredAt: '2018-05-10T14:32:18Z',
    txHash: '0x1a2b...3c4d',
  },
  {
    id: 3,
    address: '0x9c45...d6e3',
    name: 'maxlin.eth',  // ENS 名稱
    acquiredAt: '2023-03-01T16:45:33Z',
    txHash: '0x3c4d...5e6f',
  },
  {
    id: 5,
    address: '0xbe67...f8a5',
    name: 'chrischen.4388',
    acquiredAt: '2025-06-30T13:55:29Z',
    txHash: '0x5e6f...7a8b',
  },
];
