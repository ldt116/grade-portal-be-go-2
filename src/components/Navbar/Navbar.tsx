import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('role'); // Lấy giá trị role từ sessionStorage
  const protectedRole = sessionStorage.getItem('protectedRole'); // Lấy giá trị protectedRole từ sessionStorage

  const [isDropdownOpen, setDropdownOpen] = useState(false); // Quản lý trạng thái dropdown

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen); // Bật / tắt dropdown
  };

  return (
    <nav className="bg-white h-14 w-full flex border-b text-xl font-bold items-center px-6 lg:px-20 z-40 fixed top-[7rem]">
      {/* Trang chủ */}
      <div
        className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem]"
        onClick={() => navigate('/home')}
      >
        Trang chủ
      </div>

      {/* Tra cứu điểm (chỉ hiển thị với role 'client') */}
      {role === 'client' && (
        <div
          className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem]"
          onClick={() => navigate('/gradeinfo')}
        >
          Tra cứu điểm
        </div>
      )}

      {/* Quản lý (chỉ hiển thị với protectedRole 'teacher') */}
      {protectedRole === 'teacher' && (
        <div
          className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem]"
          onClick={() => navigate('/teacher/gradeinput')}
        >
          Quản lý
        </div>
      )}

      {/* Dropdown quản lý (chỉ hiển thị với role 'admin') */}
      {role === 'admin' && (
        <div className="relative">
          <div
            className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[3.25rem] flex items-center"
            onClick={handleDropdownToggle}
          >
            Quản lý
            <svg
              className={`ml-2 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 9.5L12 14.5L7 9.5"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border shadow-md w-48">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/account/add')}
              >
                Tạo tài khoản
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/account/delete')}
              >
                Xóa tài khoản
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/course/all')}
              >
                Khóa học
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/course/create')}
              >
                Tạo khóa học
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/class/create')}
              >
                Tạo lớp học
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/edit')}
              >
                Chỉnh Sửa Tài Khoản
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
