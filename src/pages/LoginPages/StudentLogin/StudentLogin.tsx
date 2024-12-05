// StudentLogin.tsx
import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import { loginWithGoogle } from './apiService';

const StudentLogin: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = async (response: any) => {
    const idToken = response.credential; // Token từ Google
    setLoading(true);
    setError(null);

    try {
      // Gọi API đăng nhập Google
      const result = await loginWithGoogle(idToken);
      console.log('Đăng nhập thành công:', result);

      // Lưu token từ backend vào localStorage
      if (result?.token) {
        localStorage.setItem('login', result.token);
        alert('Đăng nhập thành công!');
      } else {
        setError('Không tìm thấy token trong phản hồi từ server.');
      }
    } catch (err: any) {
      console.error('Lỗi đăng nhập Google:', err);
      setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý lỗi đăng nhập
  const handleLoginError = () => {
    setError('Đăng nhập với Google thất bại.');
  };

  // Sử dụng hook `useGoogleLogin`
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return (
    <GoogleOAuthProvider clientId="86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com">
      <div className="flex flex-col min-h-screen font-bold bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pb-20">
          <section className="flex flex-col items-center self-center px-16 pt-6 pb-12 mt-20 max-w-full bg-white rounded-xl border-2 border-black shadow-md w-[552px]">
            <h2 className="mt-12 text-3xl text-blue-700">Đăng nhập Student</h2>

            {/* Nút đăng nhập Google */}
            {loading ? (
              <div className="mt-8 text-blue-700 text-lg">Đang xử lý đăng nhập...</div>
            ) : (
              <button
                onClick={() => login()} // Arrow function gọi `login`
                className="flex items-center gap-4 px-8 py-4 mt-8 text-xl font-bold text-black bg-white border border-gray-300 rounded-[36px] shadow-md"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/04aed1526b03ff180c3c9a395a1a5ed82b14c59e8f27f74b99620b0a82d2737e"
                  alt="Google Icon"
                  className="w-6 h-6"
                />
                <span>Login with Google</span>
              </button>
            )}

            {/* Hiển thị lỗi */}
            {error && <div className="mt-4 text-red-500">{error}</div>}
          </section>
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default StudentLogin;
