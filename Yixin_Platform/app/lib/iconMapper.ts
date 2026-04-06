/**
 * IconMapper - 作品活動類型與 Material Symbols 圖示的對應
 *
 * 使用 Google Material Symbols Rounded
 * @see https://fonts.google.com/icons?icon.style=Rounded
 */

/**
 * 畫作活動類型
 */
export type ActivityType =
  | 'transfer'      // 所有權轉移
  | 'exhibition'    // 展出
  | 'evidence'      // 採證
  | 'verification'  // 驗證
  | 'shipping'      // 運送
  | 'storage'       // 倉儲/存放
  | 'restoration'   // 修復
  | 'appraisal'     // 鑑價
  | 'insurance'     // 投保
  | 'auction'       // 拍賣
  | 'loan'          // 借展
  | 'creation'      // 創作完成/登錄
  | 'update'        // 資訊更新
  | 'other';        // 其他

/**
 * 活動類型與 Material Symbol 圖示名稱的對應表
 * 
 * 圖示名稱請參考 Google Material Symbols:
 * https://fonts.google.com/icons?icon.style=Rounded
 */
export const activityIconMap: Record<ActivityType, string> = {
  transfer: '',       // 所有權轉移 - 例如: swap_horiz, people_arrow, handshake
  exhibition: '',     // 展出 - 例如: museum, gallery_thumbnail, visibility
  evidence: '',       // 採證 - 例如: photo_camera, document_scanner, fingerprint
  verification: '',   // 驗證 - 例如: verified, task_alt, check_circle
  shipping: '',       // 運送 - 例如: local_shipping, package_2, flight
  storage: '',        // 倉儲/存放 - 例如: warehouse, inventory_2, shelves
  restoration: '',    // 修復 - 例如: build, healing, auto_fix_high
  appraisal: '',      // 鑑價 - 例如: paid, price_check, currency_exchange
  insurance: '',      // 投保 - 例如: security, shield, verified_user
  auction: '',        // 拍賣 - 例如: gavel, sell, storefront
  loan: '',           // 借展 - 例如: sync_alt, compare_arrows, swap_calls
  creation: '',       // 創作完成/登錄 - 例如: add_circle, brush, palette
  update: '',         // 資訊更新 - 例如: edit, update, history
  other: '',          // 其他 - 例如: more_horiz, help, info
};

/**
 * 取得活動類型對應的 Material Symbol 圖示名稱
 *
 * @param type - 活動類型
 * @returns Material Symbol 圖示名稱，若無對應則回傳 'other' 類型的圖示
 *
 * @example
 * ```tsx
 * import { getActivityIcon } from '@/app/lib/iconMapper';
 *
 * const icon = getActivityIcon('transfer');
 * // 使用：<span className="material-symbols-rounded">{icon}</span>
 * ```
 */
export const getActivityIcon = (type: ActivityType | string): string => {
  const validType = type as ActivityType;
  return activityIconMap[validType] || activityIconMap.other;
};

/**
 * 活動類型的中文標籤對應表
 */
export const activityLabelMap: Record<ActivityType, string> = {
  transfer: '所有權轉移',
  exhibition: '展出',
  evidence: '採證',
  verification: '驗證',
  shipping: '運送',
  storage: '倉儲',
  restoration: '修復',
  appraisal: '鑑價',
  insurance: '投保',
  auction: '拍賣',
  loan: '借展',
  creation: '登錄',
  update: '資訊更新',
  other: '其他',
};

/**
 * 取得活動類型的中文標籤
 *
 * @param type - 活動類型
 * @returns 中文標籤
 */
export const getActivityLabel = (type: ActivityType | string): string => {
  const validType = type as ActivityType;
  return activityLabelMap[validType] || activityLabelMap.other;
};
