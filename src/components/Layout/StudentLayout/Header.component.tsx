import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/img/logo.svg';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('BearerToken');
    if (token) {
      // Fetch user info using axios if token exists
      axios
        .get('https://dacnpm.thaily.id.vn/api/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.code === 'success') {
            setIsLogin(true);
            setUserName(data.user.Name);
          } else {
            setIsLogin(false);
          }
        })
        .catch(() => {
          setIsLogin(false);
        });
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('BearerToken');
    setIsLogin(false);
    setUserName('');
    navigate('/');
  };

  return (
    <div className="bg-[#0388B4] h-[7rem] px-16 flex justify-between py-2 items-center fixed top-0 w-full z-50">
      <div className="w-[25rem] h-24">
        <img src={logo} alt="logo" />
      </div>
      {!isLogin ? (
        <div
          className="bg-[#FFFFFF] h-16 w-[10rem] flex items-center justify-center px-6 py-6 rounded-[2.25rem] text-[#002699] 
          font-bold text-[1.125rem] cursor-pointer"
          onClick={handleLogin}
        >
          Đăng nhập
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="text-white font-bold text-[1.125rem]">{userName}</div>
          <div
            className="bg-[#FFFFFF] h-16 w-[10rem] flex items-center justify-center px-6 py-6 rounded-[2.25rem] text-[#002699] 
            font-bold text-[1.125rem] cursor-pointer"
            onClick={handleLogout}
          >
            Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
