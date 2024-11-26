import logo from '../../assets/img/logo-notext.svg';
import { ADMIN_LOGIN,ADMIN_API_URL } from '../../constants/api.js'
import React, { useEffect, useState } from "react";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com";
var token = '';

function Login() {
const [data, setData] = useState(null); // Trạng thái để lưu dữ liệu từ API
  const [error, setError] = useState(null); // Trạng thái để lưu lỗi (nếu có)
  const [loading, setLoading] = useState(true); // Trạng thái để hiển thị tải

    // Hàm gọi API
    const fetchData = async () => {
      try {
        const response = await fetch("https://dacnpm.thaily.id.vn/api/info", {
  method: "GET",
  headers: {
    "Authorization": token, // Nếu cần token
    "Content-Type": "application/json", // Headers khác nếu cần
  },
}); // Gửi yêu cầu GET đến API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Parse JSON từ API
        
        setData(result); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err.message); // Lưu lỗi vào state
      } finally {
        setLoading(false); // Dừng hiển thị tải
      }
    console.log(data);
    };


const handleSuccess = (response) => {
    console.log("Login Successful:", response);
    token = response.credential;
    // You can send response.credential to your backend for verification
  };

  const handleError = () => {
    console.error("Login Failed");
  };
    const handleLogin = () => {
        fetch(ADMIN_LOGIN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({idToken: token}) })
        .then(response => console.log(response))
       
    }
        
    const getInfo = () =>{
        fetch("https://dacnpm.thaily.id.vn/api/info", { method: 'GET'})
        .then(response => console.log(response))
}
    return (
        <div className="mt-[7rem] flex justify-center items-center py-20">
            <div className="w-[33rem] h-[39rem] border border-black rounded-lg flex flex-col items-center py-5 gap-8">
                <img src={logo} alt='logo' className='w-[13rem] h-[13rem]'></img>
                <div className='w-[23rem] h-[17rem] rounded-3xl shadow-xl flex flex-col items-center py-7 gap-12'>
                    <div className='text-[#044CC8]'>Login Using your account on:</div>
                    <div className='flex flex-col gap-5 text-center'>
                        <div className='py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer' onClick={handleLogin}>Sinh viên/Giảng viên</div>
                        <div className='py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer' onClick = {fetchData}>Quản trị viên</div>
                        <GoogleOAuthProvider clientId={clientId}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>React Google Login</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </GoogleOAuthProvider>
                    </div>
                </div>
                <div className='text-[#044CC8] underline decoration-solid cursor-pointer'>
                    Bạn gặp vấn đề?
                </div>
            </div>
        </div>
    );
}

export default Login;