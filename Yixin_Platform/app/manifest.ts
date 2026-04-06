import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '藝信 Yixin',
    short_name: '藝信',
    description: 'Yixin - 藝術品交易平台',
    start_url: '/',
    display: 'fullscreen',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon/Yixin_Symbol_Light.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon/Yixin_Symbol_Dark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
