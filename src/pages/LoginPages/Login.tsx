import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-notext.svg";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import {ADMIN_LOGIN, CLIENT_LOGIN} from "../../constants/api.js"


const clientId = "86683415797-aq6n74j9gdkrd7pd3u6a2d55fh587cd3.apps.googleusercontent.com";

const Login: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null); // Endpoint API đã chọn
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook để điều hướng

  // Xử lý khi đăng nhập Google thành công
  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("No credential found in response");
      return;
    }

    const idToken = response.credential;
    console.log("Google ID Token:", idToken);

    if (!selectedEndpoint) {
      setError("No endpoint selected.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiResponse = await fetch(selectedEndpoint, {
        method: "POST",
        headers: {
          "idToken": '${idToken}',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Login failed with status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      console.log("Login success:", result);

      if (result.token) {
        localStorage.setItem("BearerToken", result.token);
        if (selectedEndpoint === CLIENT_LOGIN) {
          navigate("/home"); // Chuyển hướng đến /home nếu là Sinh viên/Giảng viên
        }
      } else {
        console.error("Token not found in response");
      }
    } catch (err) {
      console.error("Error during API login:", (err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi đăng nhập Google thất bại
  const handleError = () => {
    console.error("Google Login Failed");
    setError("Google Login Failed");
  };

  return (
    <div className="mt-[7rem] flex justify-center items-center py-20">
      <div className="w-[33rem] h-[39rem] border border-black rounded-lg flex flex-col items-center py-5 gap-8">
        <img src={logo} alt="logo" className="w-[13rem] h-[13rem]" />
        <div className="w-[23rem] h-[17rem] rounded-3xl shadow-xl flex flex-col items-center py-7 gap-12">
          <div className="text-[#044CC8]">Login Using your account on:</div>

          {selectedEndpoint ? (
            <GoogleOAuthProvider clientId={clientId}>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <div className="text-center mb-4 text-lg font-bold">
                  Đăng nhập với vai trò: {selectedEndpoint === ADMIN_LOGIN ? "Quản trị viên" : "Sinh viên/Giảng viên"}
                </div>
                {loading ? (
                  <div className="text-blue-500">Đang xử lý đăng nhập...</div>
                ) : (
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                )}
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
            </GoogleOAuthProvider>
          ) : (
            <div className="flex flex-col gap-5 text-center">
              <button
                className="py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer"
                onClick={() => setSelectedEndpoint(CLIENT_LOGIN)}
              >
                Sinh viên/Giảng viên
              </button>
              <button
                className="py-2 px-5 bg-[#0388B4] rounded-3xl text-white cursor-pointer"
                onClick={() => setSelectedEndpoint(ADMIN_LOGIN)}
              >
                Quản trị viên
              </button>
            </div>
          )}
        </div>
        <div className="text-[#044CC8] underline decoration-solid cursor-pointer">Bạn gặp vấn đề?</div>
      </div>
    </div>
  );
};

export default Login;
