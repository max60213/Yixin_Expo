import type { Metadata } from "next";
import AppBar from "@/app/components/app-bar/AppBar";
import Navigation from "@/app/components/navigation/Navigation";
import GridSystem from "@/components/GridSystem";
import { NextIntlClientProvider } from 'next-intl'
import { Providers } from "@/app/providers/providers";
import { AuthProvider } from "@/app/providers/authProvider";
import { CollectionsProvider } from "@/app/context/collectionsContext";
import { QueryProvider } from "@/app/providers/QueryProvider";
import "../components/grid-system.css";
import { SearchProvider } from "@/app/context/searchContext";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Locale 特定的 metadata 可以在這裡生成
export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {

  // 可以根據 locale 載入不同的 metadata
  // 例如從 Strapi 載入語系特定的 SEO 設定

  return {
    // metadata 會與 root layout 合併
  };
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {

  return (
    <NextIntlClientProvider>
      <AuthProvider>
        <QueryProvider>
          <CollectionsProvider relations={['artworks', 'artists', 'events']}>
            <SearchProvider>
              <AppBar />
              <Navigation />
              {/* <GridSystem className='-z-1' /> */}
              {/* Providers 只包裹頁面內容，處理頁面轉場動畫 */}
              <Providers>
                {children}
              </Providers>
            </SearchProvider>
          </CollectionsProvider>
        </QueryProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

