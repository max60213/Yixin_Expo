/**
 * Provenance 型別定義
 */

import type { BlockchainInfo } from './common';

export interface Provenance {
    id: number;
    documentId: string;
    title: string;
    type: 'Collect Evidence (採證)' | 'Verification (驗證)' | 'Exhibition (展覽)' | 'Transaction (所有權交易)' | 'Transportation (運送)' | 'Maintenance (維護)' | 'Other (其他)';
    description: string | null;
    timestamp: string | null;
    blockchainInfo: BlockchainInfo | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}
