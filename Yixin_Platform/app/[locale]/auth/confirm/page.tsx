// Path: nextjs-frontend/src/app/auth/confirm-email/page.tsx

import { Link } from "@/i18n/navigation";
import "../auth.css";

export default function ConfirmEmail() {
  return (
    <div className="auth-page page-transition">
      <div className="auth-container">
        <div className="auth-header text-center">
          <h1 className="text-text-primary">✉️ 確認您的 Email</h1>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-text-secondary text-center leading-relaxed">
            我們已經發送一封確認信到您的信箱。<br />
            請檢查您的收件匣，並點擊信中的連結來驗證您的帳號。
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-center text-sm text-text-secondary">
            <p className="mb-2">💡 小提示：</p>
            <ul className="text-left space-y-1 max-w-sm mx-auto">
              <li>• 請檢查垃圾郵件資料夾</li>
              <li>• 確認信可能需要幾分鐘才會送達</li>
              <li>• 驗證連結將在 24 小時後過期</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/auth/login" 
              className="text-primary hover:underline"
            >
              返回登入頁面
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}