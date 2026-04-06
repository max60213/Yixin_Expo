import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './artwork.css';
import Viewer from './components/Viewer';
import ArtworkHeader from './components/ArtworkHeader';
import Scroller from '@/app/components/scroller/Scroller';

// ========== SKELETON COMPONENTS ==========

export const ViewerSkeleton = () => (
  <div className="artwork-page__display">
    <Viewer loading className="artwork-page__display" />
  </div>
);

export const InfoSkeleton = () => (
  <div className="artwork-page__info">
    <ArtworkHeader loading />
    <hr className="artwork-page__info__divider divider"></hr>
    <div className="artwork-page__info__details">
      <Skeleton count={4} height={24} style={{ marginBottom: 8 }} />
    </div>
  </div>
);

export const RelatedSkeleton = () => (
  <Scroller
    category="artworks"
    title="相關作品"
    loading
    skeletonCount={4}
  />
);
