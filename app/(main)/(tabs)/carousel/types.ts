export type FeaturedType = 'event' | 'insight';

export interface EventListItem {
  id: number;
  documentId: string;
  title: string;
  publishDate: string;
  cover: any | null;
  tags: string[];
  gallery: any[];
}

export interface InsightListItem {
  id: number;
  documentId: string;
  title: string;
  publishDate: string;
  cover: any | null;
  galleries: any[];
}

export interface FeaturedListItem {
  id: number;
  documentId: string;
  title: string;
  type: FeaturedType;
  event: EventListItem | null;
  insight: InsightListItem | null;
  startDate: string | null;
  endDate: string | null;
}

export interface ArtworkListItem {
  id: number;
  documentId: string;
  title: string;
  yearFinish?: string | null;
  yearCreate?: string | null;
  artists?: any[];
  scannedImage?: any | null;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}
