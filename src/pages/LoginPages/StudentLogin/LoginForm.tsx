// LoginForm.tsx
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from './apiService';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLoginSuccess = async (response: any) => {
    const idToken = response.credential; // Token từ Google OAuth
    setLoading(true);
    setError(null);

    try {
      // Gọi API đăng nhập với token Google
      const result = await loginWithGoogle(idToken);
      console.log('Đăng nhập thành công:', result);

      // Lưu token vào localStorage
      if (result?.token) {
        localStorage.setItem('login', result.token);
      } else {
        setError('Không tìm thấy token trong phản hồi.');
      }
    } catch (err: any) {
      console.error('Lỗi đăng nhập Google:', err);
      setError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Đăng nhập với Google thất bại.');
  };

  return (
    <GoogleOAuthProvider clientId="86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com">
      <section className="flex flex-col items-center self-center px-16 pt-6 pb-12 mt-20 max-w-full bg-white rounded-xl border-2 border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[552px] max-md:px-5 max-md:mt-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/74d631e6e417eb56a0b1b9d359e0249530738c8491ebd4a84706a235de4561dd?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
          alt="Admin Login Logo"
          className="object-contain max-w-full aspect-[1.05] w-[200px]"
        />
        <h2 className="mt-12 ml-5 text-3xl text-blue-700 max-md:mt-10">
          Đăng nhập Admin
        </h2>
        {loading ? (
          <div className="mt-8 text-blue-700 text-lg">Đang xử lý đăng nhập...</div>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            theme="outline"
          />
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        <div className="flex shrink-0 mt-40 bg-white h-[34px] rounded-[36px] w-[243px] max-md:mt-10" />
      </section>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
