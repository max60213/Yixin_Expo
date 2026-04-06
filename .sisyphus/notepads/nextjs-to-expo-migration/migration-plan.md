# Expo Migration Execution Plan

**Generated:** 2026-04-05 19:45 PST  
**Source:** Yixin_Platform (Next.js 15)  
**Target:** Expo React Native (iOS 26, Android 16, Web)

---

## Phase 1: Environment Setup ✅ COMPLETE

### 1.1 Project Analysis
- [x] Analyzed complete project structure
- [x] Documented 17 routes
- [x] Identified 27+ core components
- [x] Mapped styling system (Tailwind + 42 CSS files)
- [x] Documented i18n (next-intl) implementation
- [x] Mapped auth & API integration (next-auth + Strapi)

**Files Created:**
- `.sisyphus/plans/nextjs-to-expo-migration.md`
- `.sisyphus/notepads/nextjs-to-expo-migration/analysis-complete.md`
- `.sisyphus/notepads/nextjs-to-expo-migration/migration-plan.md`
- `.sisyphus/boulder.json`

---

## Phase 2: Expo Initialization

### 2.1 Create Expo Project
```bash
npx create-expo@latest Yixin_Expo --template blank-typescript
cd Yixin_Expo
```

### 2.2 Install Core Dependencies
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/stack
npm install react-native-safe-area-context react-native-screens
npm install @react-native-async-storage/async-storage
npm install expo-localization
npm install @tanstack/react-query
npm install axios
npm install react-native-reanimated
```

### 2.3 Configure TypeScript
- Update `tsconfig.json` for Expo
- Maintain path aliases (`@/*`, `@/components/*`, etc.)

---

## Phase 3: Core Infrastructure

### 3.1 Navigation System
- Create `App.tsx` with NavigationContainer
- Auth stack navigator
- Main tab navigator
- Drawer for additional navigation

### 3.2 i18n Setup
- Migrate language files to Expo
- Configure localization hooks
- Implement locale switching

### 3.3 Context Providers
- AuthContext (replacement for next-auth)
- QueryClientProvider
- SearchContext
- CollectionsContext

### 3.4 API Client
- Replace Strapi client for React Native
- Handle async storage for tokens
- Implement OAuth flows for mobile

---

## Phase 4: Authentication Screens

### 4.1 Auth Stack Setup
- Create auth navigator group

### 4.2 Pages (in order)
1. `app/(auth)/auth/login.tsx`
2. `app/(auth)/auth/signup.tsx`
3. `app/(auth)/auth/confirm.tsx`
4. `app/(auth)/auth/success.tsx`

### 4.3 Implementation
- Form handling with react-native forms
- OAuth flow with WebView or expo-web-browser
- Token storage with AsyncStorage

---

## Phase 5: Main Navigation

### 5.1 Tab Navigation
- Home tab
- Explore tab
- Search tab
- Profile tab

### 5.2 Implement Core Screens
1. `app/(main)/index.tsx` (home with carousel)
2. `app/(main)/explore.tsx`
3. `app/(main)/search.tsx`

### 5.3 Components
- BottomTabBar replacement
- Native safe area handling
- Gesture handling

---

## Phase 6: Feature Pages

### 6.1 Home Page
- Carousel implementation (react-native-snap-carousel)
- Masonry feed (react-native-masonry-list)
- Suspense loading states

### 6.2 Explore Page
- Materials section
- Artists section
- Galleries section

### 6.3 Search Page
- Search query handling
- 6-section search results
- Individual section loading

---

## Phase 7: Detail Pages

### 7.1 Stack Navigator for Details
- Navigate to detail screens
- Back handling

### 7.2 Pages (in order)
1. `app/detail/artworks/[slug].tsx`
2. `app/detail/artworks/[slug]/activities.tsx`
3. `app/detail/artists/[slug].tsx`
4. `app/detail/galleries/[slug].tsx`
5. `app/detail/events/[slug].tsx`
6. `app/detail/insights/[slug].tsx`

### 7.3 Category Page
- `app/[category].tsx` (dynamic route)

---

## Phase 8: Shared Components

### 8.1 Core Components
1. AppBar → NativeHeader
2. Navigation → CustomTabBar
3. LocaleSwitcher → LanguageSelector
4. Header → PageHeader
5. SectionHeader → NativeSection

### 8.2 Card Components
- ArtworkCard
- ArtistCard
- GalleryCard
- EventCard
- MaterialCard
- InsightCard

### 8.3 Feature Components
- Scroller/ScrollerNative
- ArtworksMasonry
- CollectionGrid
- Form components

### 8.4 Utility Components
- Modal system
- Owner display
- SmartCertificate

---

## Phase 9: Advanced Features

### 9.1 Animations (Priority)
- **GSAP** → **react-native-reanimated**
- Bottom tab transitions
- Page transitions
- Loading animations

### 9.2 Carousel
- react-native-snap-carousel
- Auto-play functionality
- Gesture handler

### 9.3 Virtual Lists
- FlatList optimizations
- SectionList for categorization
- Performance monitoring

---

## Phase 10: iOS 26 Specific

### 10.1 Safe Area
- New iPhone notch handling
- Status bar customization
- SafeAreaView configurations

### 10.2 Dynamic Type
- Font scaling
- Layout adjustments
- Accessibility integration

### 10.3 Native Features
- Haptic feedback (react-native-haptic-feedback)
- iOS-specific gestures
- Native UI patterns (Smart Shift, Material You)

### 10.4 App Clips (iOS)
- App Clips support
- Home Screen Widgets
- WidgetKit integration

---

## Phase 11: Android 16 Specific

### 11.1 Adaptive Icons
- Vector icon configuration
- Color scheme handling
- Material You theming

### 11.2 Material You
- Dynamic color extraction
- Theme customization
- System color integration

### 11.3 Privacy
- Android 16 Privacy Dashboard
- Permission handling patterns
- Runtime permission requests

### 11.4 Tablet/Foldable
- Responsive layouts
- Fragment patterns
- Task affinity management

---

## Phase 12: Testing & Optimization

### 12.1 Platform Testing
- iOS 26 simulator
- Android 16 emulator
- Physical device testing

### 12.2 Web Testing
- Expo web compatibility
- Browser testing
- SEO validation

### 12.3 Performance
- Bundle size optimization
- Image loading optimization
- List performance tuning

### 12.4 Error Handling
- Error boundaries
- API error handling
- Network error recovery

---

## Platform-Specific Route Mapping

| Next.js | Expo | Notes |
|---------|------|-------|
| `/` | `app/(main)/index.tsx` | Home page |
| `/explore` | `app/(main)/explore.tsx` | Explore page |
| `/search` | `app/(main)/search.tsx` | Search page |
| `/profile` | `app/(main)/profile/index.tsx` | Profile home |
| `/profile/[type]` | `app/(main)/profile/[type].tsx` | Profile by type |
| `/auth/*` | `app/(auth)/auth/*.tsx` | Auth stack |
| `/artworks/[slug]` | `app/detail/artworks/[slug].tsx` | Artwork detail |
| `/artworks/[slug]/activities` | `app/detail/artworks/[slug]/activities.tsx` | Activities |
| `/artists/[slug]` | `app/detail/artists/[slug].tsx` | Artist detail |
| `/galleries/[slug]` | `app/detail/galleries/[slug].tsx` | Gallery detail |
| `/events/[slug]` | `app/detail/events/[slug].tsx` | Event detail |
| `/insights/[slug]` | `app/detail/insights/[slug].tsx` | Insight detail |
| `/[category]` | `app/[category].tsx` | Category pages |

---

## Key Migration Patterns

### Route Handling
```typescript
// Next.js
import {useParams} from 'next/navigation';

// Expo
import {useRoute, RouteProp} from '@react-navigation/native';
const route = useRoute<RouteProp<{params: {slug: string}}>>('ArtworkDetail');
const {slug} = route.params;
```

### Navigation
```typescript
// Next.js
<Link href="/auth/login">Login</Link>;

// Expo
 navigation.navigate('Login');
```

### Auth
```typescript
// Next.js
import {signIn} from 'next-auth/react';

// Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
const token = await AsyncStorage.getItem('userToken');
```

---

End of Migration Plan
