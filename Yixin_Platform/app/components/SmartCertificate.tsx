'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Autoplay } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import './smart-certificate.css';


import Image from 'next/image';


const SmartCertificate2 = () => {
  // 外部 pagination 容器
  const paginationRef = useRef<HTMLDivElement>(null);

  // 從 i18n 獲取 features 資料
  const features = [
    {
      image: 'https://picsum.photos/1200/600?random=1',
      title: 'Title 1',
      description: 'Description 1',
    },
    {
      image: 'https://picsum.photos/1200/600?random=2',
      title: 'Title 2',
      description: 'Description 2',
    },
    {
      image: 'https://picsum.photos/1200/600?random=3',
      title: 'Title 3',
      description: 'Description 3',
    },
    {
      image: 'https://picsum.photos/1200/600?random=4',
      title: 'Title 4',
      description: 'Description 4',
    },
    {
      image: 'https://picsum.photos/1200/600?random=5',
      title: 'Title 5',
      description: 'Description 5',
    },
  ]

  return (
    <section className="section smart-certificate overflow-hidden">
      <h4 className="text-pretty text-center md:-mt-8 px-2.5 md:w-8/12 mx-auto mb-18 md:mb-24">
        Description
      </h4>

      <div className="">
        {/* Testimonials Swiper */}
        <Swiper
          modules={[Pagination, Mousewheel, Autoplay]}
          slidesPerView="auto"
          centeredSlides={true}
          breakpoints={{
            0: {
              spaceBetween: 24,
            },
            800: {
              spaceBetween: 40,
            },
            1200: {
              spaceBetween: 72,
            },
            1600: {
              spaceBetween: 128,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1200}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination-smart-certificate',
          }}
          mousewheel={{
            forceToAxis: true,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 10,
          }}
          // className="smart-certificate-swiper"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <Image src={feature.image} alt="tab-to-verify" layout='responsive' width={16} height={9} />
              <div className="flex flex-col sm:px-4 mb-4">
                <h3 className="mt-3 sm:mt-5 md:mt-6">{feature.title}</h3>
                <p className="text-pretty">
                  {feature.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* 外部 Pagination */}
        <div className="custom-swiper-pagination-smart-certificate flex justify-center mt-8 lg:mt-12" ref={paginationRef} />
      </div>
    </section>
  );
};

export default SmartCertificate2;