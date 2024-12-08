import React, { useState } from 'react';
import axios from "axios";
import useProtectedRoute from '../../components/useProtectedRoute'; // Đường dẫn tới hook vừa tạo

const CourseCreate: React.FC = () => {
     useProtectedRoute('/course/create');
    const [formData, setFormData] = useState({
        ms: "",
        credit: 0,
        name: "",
        desc: "",
        BT: 0,
        TN: 0,
        BTL: 0,
        GK: 0,
        CK: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "credit" || ["BT", "TN", "BTL", "GK", "CK"].includes(name) ? Number(value) : value,
        });
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fetch the Bearer token from localStorage
    const token = localStorage.getItem("BearerToken");
    if (!token) {
        alert("Bạn chưa đăng nhập hoặc token không tồn tại!");
        return;
    }

    try {
        const response = await axios.post(
            process.env.REACT_APP_ADMIN_ADD_COURSE!,
            formData, // Body of the request
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include Bearer Token in the headers
                    "Content-Type": "application/json", // Set content type to JSON
                },
            }
        );

        // Handle success response
        console.log("Response:", response.data);
        alert("Khóa học đã được tạo thành công!");
    } catch (error) {
        // Handle error response
        console.error("Error:", error);
        alert("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại!");
    }
};

    return (
        <div className="mt-40 flex flex-col items-center min-h-screen bg-gray-100">
            <div className="w-full flex flex-col items-center justify-normal max-w-4xl mt-5 mb-5 rounded-lg border border-black p-4">
                <h1 className="text-lg font-bold mb-4">Tạo Khóa Học</h1>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-4">
                    {/* Mã Số */}
                    <div>
                        <label htmlFor="ms" className="block text-sm font-medium text-gray-700">Mã Số:</label>
                        <input
                            type="text"
                            id="ms"
                            name="ms"
                            value={formData.ms}
                            onChange={handleChange}
                            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Số Tín Chỉ */}
                    <div>
                        <label htmlFor="credit" className="block text-sm font-medium text-gray-700">Số Tín Chỉ:</label>
                        <input
                            type="number"
                            id="credit"
                            name="credit"
                            value={formData.credit}
                            onChange={handleChange}
                            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Tên */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Mô Tả */}
                    <div className="col-span-2">
                        <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Mô Tả:</label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md h-16"
                        />
                    </div>

{/* Các Trường Điểm */}
<div className="col-span-2 grid grid-cols-5 gap-4">
    <div>
        <label htmlFor="BT" className="block text-sm font-medium text-gray-700">Hệ Số BT:</label>
        <input
            type="number"
            id="BT"
            name="BT"
            value={formData.BT}
            onChange={handleChange}
            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
        />
    </div>
    <div>
        <label htmlFor="TN" className="block text-sm font-medium text-gray-700">Hệ Số TN:</label>
        <input
            type="number"
            id="TN"
            name="TN"
            value={formData.TN}
            onChange={handleChange}
            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
        />
    </div>
    <div>
        <label htmlFor="BTL" className="block text-sm font-medium text-gray-700">Hệ Số BTL:</label>
        <input
            type="number"
            id="BTL"
            name="BTL"
            value={formData.BTL}
            onChange={handleChange}
            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
        />
    </div>
    <div>
        <label htmlFor="GK" className="block text-sm font-medium text-gray-700">Hệ Số GK:</label>
        <input
            type="number"
            id="GK"
            name="GK"
            value={formData.GK}
            onChange={handleChange}
            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
        />
    </div>
    <div>
        <label htmlFor="CK" className="block text-sm font-medium text-gray-700">Hệ Số CK:</label>
        <input
            type="number"
            id="CK"
            name="CK"
            value={formData.CK}
            onChange={handleChange}
            className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded-md"
        />
    </div>
</div>


                    {/* Nút Submit */}
                    <div className="col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600"
                        >
                            Tạo Khóa Học
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseCreate;
