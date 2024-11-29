// StudentLogin.tsx
import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

const TeacherLogin: React.FC = () => {
  // Sử dụng hook `useGoogleLogin` để gọi popup đăng nhập
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google Access Token:", response.access_token);
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <GoogleOAuthProvider clientId="721522647752-e14l49v5rstiuia8cid86l1ma1a1n3nk.apps.googleusercontent.com">
      <div className="flex flex-col min-h-screen font-bold bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center pb-20">
          <section className="flex flex-col items-center self-center px-16 pt-6 pb-12 mt-20 max-w-full bg-white rounded-xl border-2 border-black shadow-md w-[552px]">
            <h2 className="mt-12 text-3xl text-blue-700">Đăng nhập Giảng viên</h2>
            {/* Nút đăng nhập Google tuỳ chỉnh */}
            <button
              onClick={() => login()} // Arrow function để gọi login không tham số
              className="flex items-center gap-4 px-8 py-4 mt-8 text-xl font-bold text-black bg-white border border-gray-300 rounded-[36px] shadow-md"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/04aed1526b03ff180c3c9a395a1a5ed82b14c59e8f27f74b99620b0a82d2737e"
                alt="Google Icon"
                className="w-6 h-6"
              />
              <span>Login with Google</span>
            </button>
          </section>
        </main>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default TeacherLogin;
