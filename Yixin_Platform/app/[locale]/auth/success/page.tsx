// Path: nextjs-frontend/src/app/auth/signup-success/page.tsx
import { Link } from "@/i18n/navigation";
import "../auth.css";

export default function EmailConfirmed() {
  return (
    <div className="auth-page page-transition">
      <div className="auth-container">
        <div className="auth-header text-center">
          <h1 className="text-text-primary">✅ Email 驗證成功！</h1>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-text-secondary text-center leading-relaxed">
            您的 Email 已成功驗證。<br />
            現在您可以使用註冊的帳號登入了。
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/auth/login">
            <button className="btn btn--primary w-full">
              前往登入
            </button>
          </Link>

          <div className="text-center">
            <Link 
              href="/" 
              className="text-text-secondary hover:text-primary transition-colors"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}