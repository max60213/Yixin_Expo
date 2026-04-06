/**
 * Series 型別定義
 */

import type { StrapiImage } from './common';

export interface Series {
    id: number;
    documentId: string;
    title: string;
    about: any | null;
    cover: StrapiImage | null;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}
