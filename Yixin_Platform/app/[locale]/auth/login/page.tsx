'use client';

import FormInput from '@/app/components/form/FormInput';
import { Link, useRouter } from '@/i18n/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import GoogleIcon from '@/public/icon/google.svg';
import "../auth.css"

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * 處理表單提交 - Strapi 原生登入
   * 使用 NextAuth 的 Credentials Provider
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 前端驗證
    if (!email || !password) {
      setError("請填寫 Email 和密碼");
      setIsLoading(false);
      return;
    }

    try {
      // 使用 NextAuth signIn with Credentials Provider
      const result = await signIn("credentials", {
        identifier: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        // NextAuth 回傳的錯誤
        setError(result.error);
      } else if (result?.ok) {
        // 登入成功
        window.dispatchEvent(new Event("auth:refresh"));
        router.push('/');
      }
    } catch (err) {
      console.error("登入異常:", err);
      setError("登入失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 處理 Google OAuth 登入
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
          <h1 className="text-text-primary">登入</h1>
          <h3 className="text-text-secondary">歡迎回到藝信</h3>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* 顯示錯誤訊息 */}
          {error && (
            <div className="error-message text-red-500 text-center mb-4 p-3 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="form-group">
            {/* Email */}
            <div>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            {/* 密碼 */}
            <div>
              <FormInput
                type="password"
                id="password"
                name="password"
                placeholder="密碼"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="buttons">
            <button
              className="btn btn--primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "登入中..." : "登入"}
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
          <span className="text-text-secondary">還沒有帳號？ </span>
          <Link className="link text-primary hover:underline" href="/auth/signup">
            註冊
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
