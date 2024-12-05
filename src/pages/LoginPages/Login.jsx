import React, { useEffect, useState } from "react";
import logo from '../../assets/img/logo-notext.svg';
import { ADMIN_LOGIN } from '../../constants/api.js'; // Đường dẫn login API của quản trị viên
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// ID Client Google OAuth
const clientId = "86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com";

function Login() {
    const [data, setData] = useState(null); // Dữ liệu trả về từ API
    const [error, setError] = useState(null); // Lỗi API
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const navigate = useNavigate();

    // Lấy thông tin từ API
    const fetchData = async () => {
        const storedToken = localStorage.getItem('login'); // Lấy token từ localStorage
        console.log(storedToken);
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
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json(); // Chuyển đổi JSON từ API
            setData(result); // Lưu dữ liệu
            console.log(result);
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
        const idToken = localStorage.getItem('authToken'); // Lấy token từ localStorage
        if (!idToken) {
            
            console.error("No token found in localStorage");
            return;
        }

        fetch(ADMIN_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Login API error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON
            })
            .then((data) => {
                console.log("Login API Response:", data);

                // Lưu token từ phản hồi vào localStorage
                if (data.token) {
                    localStorage.setItem('login', data.token);
                    console.log("Admin token stored in localStorage");
                } else {
                    console.error("Token not found in response data");
                }
            })
            .catch((error) => {
                console.error("Login API Error:", error);
            });
    };

    // const handleTeacherLogin = async () => {
    //     const idToken = localStorage.getItem("authToken"); // Lấy token từ localStorage
        
    //     if (!idToken) {
    //         console.error("No Google ID token found in localStorage. Please log in.");
    //         alert("Vui lòng đăng nhập qua Google trước!");
    //         return;
    //     }

    //     try {
    //         // Gửi idToken đến API đăng nhập của Teacher
    //         const response = await fetch("https://dacnpm.thaily.id.vn/api/login", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ idToken }), // Gửi idToken trong body
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Login API error! Status: ${response.status}`);
    //         }

    //         const data = await response.json(); // Lấy phản hồi từ API
    //         console.log("Teacher Login Response:", data);
    //         console.log(data.token)

    //         // Lưu token Teacher vào localStorage
    //         if (data.token) {
    //             localStorage.setItem("login", data.token);
    //             console.log("Teacher token stored in localStorage");
    //             console.log()
    //             // Thông báo thành công hoặc điều hướng sang trang khác

    //             alert("Đăng nhập giảng viên thành công!");
                
                

    //         } else {
    //             throw new Error("Token not found in API response");
    //         }
    //     } catch (err) {
    //         console.error("Teacher Login Error:", err.message);
    //         alert("Đăng nhập thất bại. Vui lòng thử lại.");
    //     }
    //     navigate("/teacher/gradeinput");

    // };


    const handleTeacherLogin = async () => {
        const idToken = localStorage.getItem("authToken"); // Lấy Google ID Token từ localStorage
    
        if (!idToken) {
            console.error("No Google ID token found in localStorage. Please log in.");
            alert("Vui lòng đăng nhập qua Google trước!");
            return;
        }
    
        try {
            // Gửi idToken đến API login của Client
            const response = await fetch("https://dacnpm.thaily.id.vn/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });
    
            if (!response.ok) {
                throw new Error(`Login API error! Status: ${response.status}`);
            }
    
            const data = await response.json(); // Lấy dữ liệu phản hồi
            console.log("Login Response:", data);
    
            if (data.token) {
                // Lưu Bearer Token vào localStorage
                localStorage.setItem("login", data.token);
                alert("Đăng nhập thành công!");
            } else {
                throw new Error("Token not found in API response");
            }
        } catch (err) {
            console.error("Login Error:", err.message);
            alert("Đăng nhập thất bại. Vui lòng thử lại.");
        }
    
        // Điều hướng đến trang nhập điểm sau khi login thành công
        navigate("/teacher/gradeinput");
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
                            onClick={handleTeacherLogin}
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
