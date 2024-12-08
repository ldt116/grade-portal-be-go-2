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
  if (!token) {
    navigate('/');
    return;
  }

  const role = sessionStorage.getItem('role');
  const apiUrl =
    role === 'admin'
      ? 'https://dacnpm.thaily.id.vn/admin/api/profile'
      : 'https://dacnpm.thaily.id.vn/api/info';

  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      if (data.code === 'success') {
        setIsLogin(true);
        setUserName(data.user.Name);
        console.log(data);
        // Lưu protectedRole vào sessionStorage
        const userRole = data.user.Role;
        if (role === 'client') {
          sessionStorage.setItem('protectedRole', userRole);
            console.log(userRole);
        } else if (role === 'admin') {
          sessionStorage.setItem('protectedRole', 'admin');
            console.log('admin')
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching user info:', error);
      setIsLogin(false);
      navigate('/');
    });
}, []);
  const handleLogin = () => {
    navigate('/login');
  };

 const handleLogout = async () => {
  const token = localStorage.getItem('BearerToken');
  const role = sessionStorage.getItem('role'); // Lấy role từ sessionStorage

  if (!token || !role) {
    console.warn("No token or role found, redirecting to login");
    localStorage.clear();
    sessionStorage.clear();
    setIsLogin(false);
    setUserName('');
    navigate('/');
    return;
  }

  try {
    // Xác định URL API dựa trên role
    const apiUrl =
      role === 'admin'
        ? 'https://dacnpm.thaily.id.vn/api/admin/logout'
        : 'https://dacnpm.thaily.id.vn/api/logout';

    // Gọi API logout với token
    const response = await axios.post(
      apiUrl,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.data.code === 'success') {
      console.log('Logged out successfully');
    } else {
      console.warn('Logout failed:', response.data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Xóa toàn bộ dữ liệu trong localStorage và sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Reset trạng thái người dùng
    setIsLogin(false);
    setUserName('');
    navigate('/');
  }
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
