/**
 * Strapi Image Handler for React Native
 * Converts Strapi image URLs to format usable by react-native-image or similar
 */

interface StrapiImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}

/**
 * Transform Strapi image URL for optimal loading
 */
export const formatStrapiImage = (
  url: string | null | undefined,
  options?: StrapiImageOptions
): string => {
  if (!url) return '';

  // Handle relative URLs
  const fullUrl = url.startsWith('http') ? url : `https://studio.yixin.art${url}`;

  // Extract image parameters from URL if present
  const baseUrl = fullUrl.split('?')[0];
  const queryString = fullUrl.includes('?') ? `?${fullUrl.split('?')[1]}` : '';

  // Add or update width/height parameters
  const params = new URLSearchParams();
  
  if (options?.width) {
    params.set('w', options.width.toString());
  }
  
  if (options?.height) {
    params.set('h', options.height.toString());
  }
  
  if (options?.quality) {
    params.set('q', options.quality.toString());
  }
  
  if (options?.format) {
    params.set('fm', options.format);
  }

  const paramStr = params.toString();
  
  return `${baseUrl}${paramStr ? `?${paramStr}${queryString ? '&' + queryString : ''}` : queryString}`;
};

/**
 * Get image source object for react-native Image component
 */
export const getStrapiImageSource = (
  url: string | null | undefined,
  options?: StrapiImageOptions
): { uri: string } => {
  return { uri: formatStrapiImage(url, options) };
};

/**
 * Handle image loading errors with fallback
 */
export const handleImageError = (fallbackUri?: string) => {
  return () => {
    // In production, you might want to log this error
    console.log('Image failed to load, using fallback');
  };
};

/**
 * Get placeholder image for loading state
 */
export const getPlaceholderImage = (): { uri: string } => {
  return { 
    uri: 'https://via.placeholder.com/400x300?text=Loading...' 
  };
};

export default formatStrapiImage;
