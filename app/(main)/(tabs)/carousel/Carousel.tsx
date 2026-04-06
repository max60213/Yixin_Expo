'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocale } from '@/locales';
import type { FeaturedListItem } from './types';
import { strapiImage } from '@/lib/strapi/strapiImage';

const PLACEHOLDER = '/placeholder-cover.png';

function getSlideData(item: FeaturedListItem) {
  const content = item.type === 'event' ? item.event : item.insight;
  const cover = content?.cover;
  const documentId = content?.documentId;
  const route = item.type === 'event' ? 'events' : 'insights';

  const imageSrc = cover?.url ? strapiImage(cover.url) : PLACEHOLDER;

  return {
    id: item.documentId,
    title: item.title,
    image: imageSrc,
    href: documentId ? `/${route}/${documentId}` : '#',
  };
}

interface CarouselProps {
  data?: FeaturedListItem[];
}

const Carousel = ({ data }: CarouselProps) => {
  const router = useRouter();
  const { t } = useLocale();

  if (!data) {
    return (
      <View style={styles.carousel}>
        <View style={styles.carouselWrapper}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (data.length === 0) return null;

  const slides = data.map(getSlideData);

  return (
    <View style={styles.carousel}>
      <View style={styles.carouselWrapper}>
        <View style={styles.imageSliderContainer}>
          {slides.map((slide) => (
            <View key={slide.id} style={styles.slide}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: slide.image }}
                  style={styles.slideImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.titleSliderContainer}>
          {slides.map((slide) => (
            <View key={`title-${slide.id}`} style={styles.titleSlide}>
              <Text style={styles.slideTitle} numberOfLines={2}>
                {slide.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 24,
  },
  carouselWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  imageSliderContainer: {
    height: 400,
    width: '100%',
    maxWidth: 900,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    aspectRatio: 2 / 1,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  slide: {
    flex: 1,
    width: '100%',
  },
  titleSliderContainer: {
    height: 60,
    width: '100%',
    maxWidth: 900,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
    justifyContent: 'center',
  },
  titleSlide: {
    flex: 1,
    minWidth: 200,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default Carousel;
