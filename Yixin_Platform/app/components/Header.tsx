import "./header.css";

const CATEGORY_TITLES: Record<string, string> = {
  "artists": "所有藝術家",
  "artworks": "所有作品",
  "events": "所有活動",
  "materials": "所有媒材",
  "galleries": "所有畫廊",
  "insights": "所有專欄",
};

interface HeaderProps {
  /** 自訂標題（優先使用） */
  title?: string;
  /** 分類名稱（用於查找預設標題） */
  category?: string;
  /** 額外內容（顯示在 h1 旁邊） */
  children?: React.ReactNode;
}

const Header = ({ title, category, children }: HeaderProps) => {
  const displayTitle = title || (category && CATEGORY_TITLES[category]) || category || '';

  return (
    <header className="relative collection-header mb-8 lg:mb-12 px-(--grid-padding) pt-8 z-3">
      <div className="flex items-baseline gap-2 md:gap-3">
        <h1 className="collection-header__title">
          {displayTitle}
        </h1>
        {children}
      </div>
      <hr className="collection-header__divider border-black opacity-10 mt-4" />
    </header>
  );
};

export default Header;