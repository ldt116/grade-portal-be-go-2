import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse"; // Install this library using: npm install papaparse

const AddMember: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    faculty: "",
    ms: "",
  });

  // State to manage status message
  const [statusMessage, setStatusMessage] = useState("");

  // State to manage file input
  const [file, setFile] = useState<File | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle CSV file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Parse CSV and send data
  const handleFileUpload = async () => {
    if (!file) {
      setStatusMessage("Vui lòng chọn một tệp CSV.");
      return;
    }

    const token = localStorage.getItem("BearerToken");

    if (!token) {
      setStatusMessage("Token không tồn tại. Vui lòng đăng nhập lại.");
      return;
    }

    // Parse the CSV file
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const data = results.data; // Parsed JSON data
          console.log("Parsed Data:", data);

          // Send parsed data to the API
          const response = await axios.post(
            "https://dacnpm.thaily.id.vn/admin/api/account/create",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          setStatusMessage("Tạo tài khoản thành công!");
          console.log(response)
          setFile(null); // Reset file input
        } catch (error) {
          console.error("Error uploading CSV data:", error);
          setStatusMessage("Đã xảy ra lỗi khi tạo tài khoản từ CSV.");
        }
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
        setStatusMessage("Đã xảy ra lỗi khi phân tích tệp CSV.");
      },
    });
  };

  // Handle form submission for single user
  const handleSubmit = async () => {
    const token = localStorage.getItem("BearerToken");

    if (!token) {
      setStatusMessage("Token không tồn tại. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const response = await axios.post(
        "https://dacnpm.thaily.id.vn/admin/api/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage("Tạo admin thành công!");
      setFormData({ email: "", name: "", faculty: "", ms: "" }); // Reset form
    } catch (error) {
      console.error("Error creating admin:", error);
      setStatusMessage("Đã xảy ra lỗi khi tạo admin.");
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col items-center max-w-4xl mt-5 mb-5 rounded-lg border border-black p-4 bg-white">
        <h1 className="text-2xl font-bold mb-5">Thêm Tài Khoản</h1>
        <div className="w-full max-w flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded-lg"
              placeholder="Nhập email"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded-lg"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">Khoa</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded-lg"
              placeholder="Nhập tên khoa"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-1">Mã số</label>
            <input
              type="text"
              name="ms"
              value={formData.ms}
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded-lg"
              placeholder="Nhập mã số"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          TẠO ADMIN
        </button>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Tải lên danh sách tài khoản</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            onClick={handleFileUpload}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            TẠO TÀI KHOẢN GV/SV
          </button>
        </div>
        {statusMessage && (
          <p className="mt-4 text-center text-red-500">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AddMember;
