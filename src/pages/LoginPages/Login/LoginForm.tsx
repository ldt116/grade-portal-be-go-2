// LoginForm.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  logoSrc: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ logoSrc }) => {
  return (
    <section className="flex flex-col items-center self-center px-20 pt-6 pb-12 mt-20 max-w-full font-medium text-black bg-white rounded-xl border-2 border-black border-solid shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[540px] max-md:px-5 max-md:mt-10">
      <img loading="lazy" src={logoSrc} alt="Login Logo" className="object-contain max-w-full aspect-[1.05] w-[200px]" />
      <div className="flex flex-col px-14 pt-7 pb-14 mt-8 w-full bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
        <div className="flex gap-4 px-6 py-3 mt-11 rounded-3xl bg-blue-500 max-md:px-5 max-md:mt-10 max-md:mr-2">
          <Link
            to="/login/student"
            className="flex-grow text-white text-center py-2 rounded-lg hover:bg-blue-400"
          >
            Sinh viên
          </Link>
          <Link
            to="/login/teacher"
            className="flex-grow text-white text-center py-2 rounded-lg hover:bg-blue-400"
          >
            Giảng viên
          </Link>
        </div>
        <Link
          to="/login/admin"
          className="self-center px-11 py-3 mt-8 max-w-full rounded-3xl w-[200px] bg-blue-500 text-white text-center hover:bg-blue-400"
        >
          Quản trị viên
        </Link>
      </div>
      <div className="flex shrink-0 mt-6 bg-white h-[34px] rounded-[36px] w-[243px]" />
    </section>
  );
};

export default LoginForm;
