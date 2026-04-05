import {createNavigation} from 'next-intl/navigation';

// Light wrapper, wrapping Next.js routing API
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation({
  locales: ['en', 'zh-TW'],
  defaultLocale: 'en',
});

export default Link;
