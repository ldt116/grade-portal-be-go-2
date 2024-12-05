// Header.tsx
import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between px-20 py-5 w-full font-bold text-center text-blue-900 bg-cyan-600 max-md:px-5 max-md:max-w-full">
      <div className="flex gap-3.5 px-7 py-3 text-lg text-blue-900 bg-white rounded-[30px] max-md:px-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d6e3d0b82f1251f02c2f317eafb29fe09f47dbe5a226aa1dbeac5d7b6efbf04?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
          alt="University logo"
          className="object-contain shrink-0 aspect-[0.94] w-[66px]"
        />
        <div className="flex-auto my-auto">
          ĐẠI HỌC QUỐC GIA TP.HCM <br /> TRƯỜNG ĐẠI HỌC BÁCH KHOA
        </div>
      </div>
    </header>
  );
};

export default Header;