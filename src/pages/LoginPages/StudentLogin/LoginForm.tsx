// LoginForm.tsx
import React from 'react';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  return (
    <section className="flex flex-col items-center self-center px-16 pt-6 pb-12 mt-20 max-w-full bg-white rounded-xl border-2 border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[552px] max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/74d631e6e417eb56a0b1b9d359e0249530738c8491ebd4a84706a235de4561dd?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
        alt="Student Login Logo"
        className="object-contain max-w-full aspect-[1.05] w-[200px]"
      />
      <h2 className="mt-12 ml-5 text-3xl text-blue-700 max-md:mt-10">
        Đăng nhập Student
      </h2>
      <button className="flex gap-10 self-stretch px-12 py-5 mt-4 text-xl text-black bg-white rounded-[36px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/04aed1526b03ff180c3c9a395a1a5ed82b14c59e8f27f74b99620b0a82d2737e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
          alt=""
          className="object-contain shrink-0 self-start aspect-square w-[22px]"
        />
        <span className="grow shrink w-[241px]">Login with Google</span>
      </button>
      <div className="flex shrink-0 mt-40 bg-white h-[34px] rounded-[36px] w-[243px] max-md:mt-10" />
    </section>
  );
};

export default LoginForm;
