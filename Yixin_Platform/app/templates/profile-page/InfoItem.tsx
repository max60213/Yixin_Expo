"use client";

/**
 * 資訊項目元件的屬性介面
 */
interface InfoItemProps {
  /** 標籤文字（例如：官網、電話、信箱等） */
  label: string;
  /** 顯示的值（例如：URL、電話號碼、電子郵件地址等） */
  value: string;
  /** 資訊類型，決定如何渲染連結 */
  type: "link" | "mail" | "phone" | "address" | "name";
}

/**
 * 資訊項目元件
 * 根據不同的類型（type）自動生成對應的連結或純文字顯示
 * 
 * @param label - 標籤文字
 * @param value - 顯示的值
 * @param type - 資訊類型：
 *   - "link": 一般網址連結，在新分頁開啟
 *   - "mail": 電子郵件連結，開啟郵件客戶端
 *   - "phone": 電話連結，撥打電話
 *   - "address": 地址連結，開啟 Google Maps
 *   - "name": 純文字顯示，無連結
 */
export default function InfoItem({ label, value, type }: InfoItemProps) {
  /**
   * 根據類型生成對應的 href 屬性值
   * @returns 連結網址，若無連結則返回 null
   */
  const getHref = (): string | null => {
    switch (type) {
      case "link":
        // 一般網址，直接使用 value
        return value;
      case "mail":
        // 電子郵件，加上 mailto: 前綴
        return `mailto:${value}`;
      case "phone":
        // 電話號碼，加上 tel: 前綴
        return `tel:${value}`;
      case "address":
        // 地址，開啟 Google Maps
        return `https://www.google.com/maps`;
      case "name":
        // 姓名，無連結
        return null;
      default:
        return null;
    }
  };

  /**
   * 根據類型決定連結的 target 屬性
   * @returns "_blank" 表示在新分頁開啟，undefined 表示在當前分頁開啟
   */
  const getTarget = (): string | undefined => {
    // link 和 address 類型在新分頁開啟
    if (type === "link" || type === "address") {
      return "_blank";
    }
    return undefined;
  };

  // 判斷是否需要顯示為連結樣式（加上 --link modifier）
  const shouldShowLink = type === "link" || type === "mail" || type === "phone" || type === "address";
  const valueClassName = `about__content__info__value${shouldShowLink ? ' about__content__info__value--link' : ''}`;
  const href = getHref();
  const target = getTarget();

  return (
    <div className="about__content__info__item">
      {/* 標籤 */}
      <span className="about__content__info__label">{label}</span>
      {/* 根據是否有 href 決定渲染為連結或純文字 */}
      {href ? (
        <a className={`link link--primary w-fit ${valueClassName}`} href={href} target={target}>
          {value}
        </a>
      ) : (
        <span className={valueClassName}>{value}</span>
      )}
    </div>
  );
}

