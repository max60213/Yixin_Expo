export interface ArtworkListItem {
  id: number;
  documentId: string;
  title: string;
  yearFinish?: string | null;
  yearCreate?: string | null;
  artists?: any[];
  scannedImage?: any | null;
}
