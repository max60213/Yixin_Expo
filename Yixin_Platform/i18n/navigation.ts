import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
// 輕量包裝器，包裝 Next.js 的導航 API，考慮路由配置
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);