"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Mousewheel, Pagination, Controller, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import "./carousel.css";
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { strapiImage, getBlurDataURL } from '@/app/lib/strapi/strapiImage';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import type { FeaturedListItem } from '@/app/lib/model/featured';

interface CarouselProps {
  /** Featured 資料，undefined 時顯示 skeleton */
  data?: FeaturedListItem[];
}

// 定義預設佔位圖
const PLACEHOLDER = "/placeholder-cover.png";

/**
 * 從 FeaturedListItem 取得顯示用資料
 */
function getSlideData(item: FeaturedListItem) {
  const content = item.type === 'event' ? item.event : item.insight;
  const cover = content?.cover;
  const documentId = content?.documentId;
  const route = item.type === 'event' ? 'events' : 'insights';

  // 決定圖片來源（有圖片用圖片，沒有用佔位圖）
  const imageSrc = cover?.url ? strapiImage(cover.url) : PLACEHOLDER;

  return {
    id: item.documentId,
    title: item.title,
    image: imageSrc,
    blurDataURL: getBlurDataURL(imageSrc),
    href: documentId ? `/${route}/${documentId}` : '#',
  };
}

const Carousel = ({ data }: CarouselProps) => {
  const [imageSwiper, setImageSwiper] = useState<SwiperType | null>(null);
  const [titleSwiper, setTitleSwiper] = useState<SwiperType | null>(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };

  // Skeleton 狀態
  if (!data) {
    return (
      <div className="carousel">
        <div className="carousel-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Skeleton
            height={400}
            width="100%"
            style={{ maxWidth: '900px', borderRadius: '8px' }}
          />
          <Skeleton width={300} height={36} />
        </div>
      </div>
    );
  }

  // 沒資料時不顯示
  if (data.length === 0) return null;

  const slides = data.map(getSlideData);

  return (
    <div className="carousel">
      <div className="carousel-wrapper">
        {/* 圖片 Slider */}
        <Swiper
          modules={[Mousewheel, Autoplay, Controller, EffectCoverflow]}
          slidesPerView="auto"
          centeredSlides={true}
          loop={slides.length > 1}
          speed={800}
          effect="coverflow"
          autoplay={{
            delay: 5000,
            // pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            slideShadows: false,
            rotate: 20,
            scale: 1.06
          }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 5,
          }}
          controller={{ control: titleSwiper }}
          onSwiper={setImageSwiper}
          className="carousel-image-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Link href={slide.href} style={{ display: 'block', position: 'relative', aspectRatio: '2/1', width: '100%' }}>
                <Image
                  src={slide.image}
                  alt={slide.title || 'carousel slide'}
                  fill
                  placeholder="blur"
                  blurDataURL={slide.blurDataURL}
                  sizes="
                    (min-width: 1400px) 900px,
                    (min-width: 1100px) 70vw,
                    (min-width: 800px) 85vw,
                    100vw
                  "
                  style={{ objectFit: 'cover' }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 標題 Slider */}
        <Swiper
          modules={[Mousewheel, Controller, Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          loop={slides.length > 1}
          speed={600}
          spaceBetween={34}
          allowTouchMove={true}
          controller={{ control: imageSwiper }}
          onSwiper={setTitleSwiper}
          pagination={pagination}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 5,
          }}
          className="carousel-title-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={`title-${slide.id}`}>
              <Link href={slide.href}>
                <h2 className="carousel-title-slide line-clamp-2">{slide.title}</h2>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Carousel;
