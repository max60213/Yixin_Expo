'use client';

import FormInput from '@/app/components/form/FormInput';
import { Link, useRouter } from '@/i18n/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import GoogleIcon from '@/public/icon/google.svg';
import "../auth.css"

// 表單錯誤類型
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  /**
   * 解析 Strapi 錯誤訊息
   */
  const parseErrorMessage = (errorText: string): string => {
    if (!errorText || typeof errorText !== "string") {
      return "註冊失敗，請稍後再試";
    }

    const lowerError = errorText.toLowerCase();

    if (lowerError.includes("email") || lowerError.includes("電子郵件")) {
      return "此 Email 已被使用或格式不正確";
    }

    if (lowerError.includes("username") || lowerError.includes("使用者名稱") || lowerError.includes("名稱")) {
      return "此名稱已被使用";
    }

    if (lowerError.includes("password") || lowerError.includes("密碼")) {
      return "密碼不符合要求（至少 6 個字元）";
    }

    if (lowerError.includes("network") || lowerError.includes("econnrefused") ||
      lowerError.includes("timeout") || lowerError.includes("enotfound")) {
      return "無法連接到伺服器，請檢查網路連線";
    }

    return errorText.length > 100 ? "註冊失敗，請稍後再試" : errorText;
  };

  /**
   * 處理表單提交 - Strapi 原生註冊
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 前端驗證
    const validationErrors: FormErrors = {};

    if (!username) validationErrors.username = "名稱為必填";
    if (!email) validationErrors.email = "Email 為必填";
    if (!password) validationErrors.password = "密碼為必填";
    if (!confirmPassword) validationErrors.confirmPassword = "確認密碼為必填";
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.confirmPassword = "密碼不符合";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // 直接呼叫 Strapi 註冊 API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error?.message || "註冊失敗";
        setError(parseErrorMessage(errorMessage));
        return;
      }

      // 註冊成功，導向確認頁面
      router.push('/auth/confirm');
    } catch (err) {
      console.error("註冊異常:", err);
      setError("註冊失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 處理 Google OAuth 登入（也可用於註冊）
   */
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.error("Google 登入異常:", err);
      setError("登入失敗，請稍後再試");
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page page-transition">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="text-text-primary">註冊帳號</h1>
          <h3 className="text-text-secondary">加入 Yixin 藝術平台</h3>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* 顯示錯誤訊息 */}
          {error && (
            <div className="error-message text-red-500 text-center mb-4 p-3 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="form-group">
            {/* Username */}
            <div>
              <FormInput
                type="text"
                id="username"
                name="username"
                placeholder="名稱"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* 密碼 */}
            <div>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="密碼"
                autoComplete="new-password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* 確認密碼 */}
            <div>
              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="確認密碼"
                autoComplete="new-password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="buttons">
            <button
              className="btn btn--primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "註冊中..." : "註冊"}
            </button>

            <p className="text-center my-6 mb-5 caption">或</p>

            {/* Google OAuth 登入按鈕 */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="google-signin-btn btn"
            >
              <GoogleIcon />
              使用 Google 登入
            </button>
          </div>
        </form>

        <div className="auth-link mx-auto text-center mt-12">
          <span className="text-text-secondary">已有帳號？ </span>
          <Link className="link text-primary hover:underline" href="/auth/login">
            登入
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
