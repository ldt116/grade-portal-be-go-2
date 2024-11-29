// Login.tsx
import React from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const loginLogoSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/74d631e6e417eb56a0b1b9d359e0249530738c8491ebd4a84706a235de4561dd?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8";

  return (
    <div className="flex flex-col min-h-screen text-lg bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center pb-20"> {/* Thêm pb-20 để tạo khoảng cách */}
        <LoginForm logoSrc={loginLogoSrc} />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
