import React, { useEffect, useState } from "react";
import logo from '../../assets/img/logo-notext.svg';
import { ADMIN_LOGIN } from '../../constants/api.js'; // Đường dẫn login API của quản trị viên
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// ID Client Google OAuth
const clientId = "86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com";

function Login() {
    const [data, setData] = useState(null); // Dữ liệu trả về từ API
    const [error, setError] = useState(null); // Lỗi API
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Lấy thông tin từ API
    const fetchData = async () => {
        const storedToken = localStorage.getItem('authToken'); // Lấy token từ localStorage
        if (!storedToken) {
            setError("No token found. Please log in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://dacnpm.thaily.id.vn/api/info", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${storedToken}`, // Thêm token vào header
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // Chuyển đổi JSON từ API
            setData(result); // Lưu dữ liệu
        } catch (err) {
            setError(err.message); // Lưu lỗi nếu xảy ra
        } finally {
            setLoading(false); // Dừng loading
        }
    };

    // Xử lý khi đăng nhập Google thành công
    const handleSuccess = (response) => {
        console.log("Login Successful:", response);
        const token = response.credential;

        // Lưu token vào localStorage
        localStorage.setItem('authToken', token);

        console.log("Token stored in localStorage");
    };

    // Xử lý khi đăng nhập Google thất bại
    const handleError = () => {
        console.error("Login Failed");
    };

    // Đăng nhập cho quản trị viên
    const handleLogin = () => {
        const storedToken = localStorage.getItem('authToken'); // Lấy token từ localStorage
        if (storedToken) {
            fetch(ADMIN_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                },
                body: JSON.stringify({ idToken: storedToken })
            })
                .then(response => response.json())
                .then(data => console.log("Login API Response:", data))
                .catch(error => console.error("Login API Error:", error));
        } else {
            console.error("No token found in localStorage");
        }
    };

    return (
        <div className="mt-[7rem] flex justify-center items-center py-20">
            <div className="w-[33rem] h-[39rem] border border-black rounded-lg flex flex-col items-center py-5 gap-8">
                <img src={logo} alt="logo" className="w-[13rem] h-[13rem]" />
                <div className="w-[23rem] h-[17rem] rounded-3xl shadow-xl flex flex-col items-center py-7 gap-12">
                    <div className="text-[#044CC8]">Login Using your account on:</div>
                    <div className="flex flex-col gap-5 text-center">
                        <div
                            className="py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer"
                            onClick={handleLogin}
                        >
                            Sinh viên/Giảng viên
                        </div>
                        <div
                            className="py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer"
                            
                        >
                            Quản trị viên
                        </div><div
                            className="py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer"
                            onClick={fetchData}
                        >
                            TTT
                        </div>
                        <GoogleOAuthProvider clientId={clientId}>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <h1>Google Login</h1>
                                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                            </div>
                        </GoogleOAuthProvider>
                    </div>
                </div>
                <div className="text-[#044CC8] underline decoration-solid cursor-pointer">
                    Bạn gặp vấn đề?
                </div>
            </div>
        </div>
    );
}

export default Login;
