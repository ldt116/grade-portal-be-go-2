// apiService.ts
const BASE_URL = "https://dacnpm.thaily.id.vn/api";

// Hàm xử lý fetch API
const apiFetch = async (endpoint: string, method: string = "GET", body: any = null, token: string | null = null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Nếu có token, thêm vào headers
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json(); // Parse kết quả JSON
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error; // Bắn lỗi ra cho component xử lý
  }
};

// Hàm đăng nhập Google
export const loginWithGoogle = async (idToken: string) => {
  return apiFetch("login", "POST", { idToken });
};

// Hàm lấy thông tin user
export const getUserInfo = async (token: string) => {
  return apiFetch("info", "GET", null, token);
};

// Hàm đăng nhập Admin
export const loginAdmin = async (idToken: string) => {
  return apiFetch("admin-login", "POST", { idToken });
};
