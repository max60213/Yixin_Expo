# Next.js to Expo Migration - Learnings

## Generated: 2026-04-05

## Project Analysis Summary

### Project Structure Overview
- **Base Framework**: Next.js 15 with App Router
- **Target**: React Native Expo (iOS 26, Android 16, Web)
- **App Structure**: Locale-based routing at `/app/[locale]/`
- **Total Routes**: 17+ pages
- **Total Components**: 40+ components across multiple directories

### Route Structure
| Route | Type | Description |
|-------|------|-------------|
| `/` | Home | Main feed with carousel, events, insights |
| `/explore` | Feature | Explore page with materials, artists, galleries |
| `/search` | Feature | Search page |
| `/profile` | Feature | User profile page |
| `/profile/[type]` | Dynamic | Profile by type |
| `/auth/signup` | Auth | User signup |
| `/auth/login` | Auth | User login |
| `/auth/confirm` | Auth | Email confirmation |
| `/auth/success` | Auth | Success page |
| `/artworks/[slug]` | Detail | Artwork detail page |
| `/artworks/[slug]/activities` | Detail | Artwork activities |
| `/artists/[slug]` | Detail | Artist detail |
| `/galleries/[slug]` | Detail | Gallery detail |
| `/events/[slug]` | Detail | Event detail |
| `/insights/[slug]` | Detail | Insight detail |
| `/[category]` | Dynamic | Category page |

### Next.js Specific Features Used
1. **File-based Routing**: `/app/[locale]/` directory structure
2. **Server Components**: Default async components
3. **next-auth**: Authentication (`signIn` from `next-auth/react`)
4. **next-intl**: Internationalization
5. **next/image**: Optimized images
6. **next/navigation**: `notFound`, `useRouter`, `usePathname`
7. **next/dynamic**: Dynamic imports for client components
8. **App Router APIs**: `generateMetadata`, `generatePath`
9. **next/server**: API routes (`NextRequest`, `NextResponse`)
10. **next/cache**: `unstable_noStore`

### Shared Components
1. **AppBar** - Top navigation with logo and account menu
2. **Navigation** - Bottom tab navigation with GSAP animations
3. **LocaleSwitcher** - Language selector
4. **SectionHeader** - Section headers with links
5. **Carousel** - Featured images carousel
6. **SuspenseScroller** - Loading state management for sections
7. **CollectionGrid/GridSkeleton** - Grid layouts
8. **ArtworksMasonry/SuspenseArtworksMasonry** - Masonry layouts
9. **FormInput** - Form fields
10. **SearchContext** - Search state management
11. **CollectionsContext** - Collections state management
12. **AuthProvider** - Authentication context
13. **QueryProvider** - React Query provider

### Styling System
- **Tailwind CSS v4**: Utility-first styling
- **Custom CSS**: Additional CSS files (navigation.css, search.css, etc.)
- **GSAP**: Complex animations for Navigation
- **@react-spring/web**: Web animations
- **Swiper**: Carousel component
- **Masonry**: React masonry layouts

### Key Dependencies
```json
{
  "next": "^15.5.9",
  "next-auth": "^4.24.13",
  "next-intl": "^4.3.4",
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "gsap": "^3.x",
  "@gsap/react": "^2.1.2",
  "react-intersection-observer": "^10.0.0"
}
```

### i18n Structure
- **Location**: `/i18n/`
- **Messages**: `/messages/en.json`, `/messages/zh-TW.json`
- **Routing**: Custom i18n routing module
- **Implementation**: next-intl with App Router integration

### Known Platform-Specific Challenges

#### iOS 26 Considerations
- Safe Area handling for new iPhone models
- Dynamic Type support
- Smart Shift UI patterns
- Haptic feedback integration
- Native gestures

#### Android 16 Considerations
- Adaptive Icons
- Material You color schemes
- Privacy Dashboard patterns
- Foldable/Tablet support

## Migration Strategy Patterns

### 1. Route Mapping
- Next.js: `/app/[locale]/artworks/[slug]/page.tsx`
- Expo: `app/(auth)/auth/signup.tsx`, `app/(main)/artworks/[slug].tsx`

### 2. Component Migration
- Server Components → Client Components with React Native
- CSS → StyleSheet / Tailwind Native
- next/image → Image from React Native

### 3. Navigation Migration
- File-based → React Navigation
- Client-side router → NavigationContainer
- Dynamic routes → Route params

### 4. i18n Migration
- next-intl → expo-localization / react-intl
- Routing → React Navigation state

### 5. Auth Migration
- next-auth → React Native auth libraries
- Server-side sessions → Local storage / async-storage

## Issues Encountered

### Known Issues
- **Authentication**: next-auth won't work in React Native
- **Images**: next/image needs replacement with react-native-image
- **Navigation**: File-based routing needs complete rewrite
- **Styling**: CSS/Tailwind needs conversion to StyleSheet
- **Animations**: GSAP web animation needs react-native-reanimated

### Potential Blockers
- next-intl has limited React Native support
- Server-side rendering concepts don't apply
- Dynamic imports may need bundling changes


## Expanded Analysis

### Additional Pages Analyzed

#### Search Page (`/search`)
- URL-based search with `q` parameter
- Searches 5 data types: Events, Insights, Materials, Artists, Galleries, Artworks
- Uses SuspenseScroller for each section
- Server-component with async search fetching

#### Explore Page (`/explore`)
- Three main sections: Materials, Artists, Galleries
- Each section uses SuspenseScroller
- Separate fetchers for each category

### CSS Files Found (30 total)
1. **Typography**: app/typography.css
2. **Breakpoints**: app/breakpoints.css  
3. **Home**: app/[locale]/home/home.css
4. **Auth**: app/[locale]/auth/auth.css
5. **Explore**: app/[locale]/explore/explore.css
6. **Search**: app/[locale]/search/search.css
7. **Profile**: app/[locale]/profile/profile.css
8. **Artwork Detail**: Multiple files for components
9. **Artwork Activities**: activities.css
10. **Components**: Form, Masonry, Navigation, AppBar, etc.

### Styling Strategy Summary
- **Primary**: Tailwind CSS (utility classes)
- **Supplemental**: ~30 CSS files for custom/stage-specific needs
- **Animations**: GSAP for complex UI animations
- **Layout**: Mix of flexbox, grid, and custom masonry

### Config Files
- **next.config.ts**: Complex configuration with:
  - basePath for proxy environments
  - Image optimization with custom loader
  - SVGR handling
  - Multiple remotePatterns for images
  - next-intl plugin integration

### Providers Structure
1. **AuthProvider**: next-auth based authentication
2. **QueryProvider**: React Query setup
3. **Providers**: Additional provider wrapping


