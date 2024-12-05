import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-14 w-full flex border-b text-xl font-bold items-center px-20 z-40 fixed top-[7rem]">
      <div
        className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem]"
        onClick={() => navigate('/home')}
      >
        Trang chủ
      </div>
      <div
        className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem]"
        onClick={() => navigate('/gradeinfo')}
      >
        Tra cứu điểm
      </div>
      
    </div>
  );
}

export default Navbar;
