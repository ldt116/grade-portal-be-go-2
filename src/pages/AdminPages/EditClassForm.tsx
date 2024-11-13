import React from 'react'
import Navbar from '../../components/Navbar/Navbar';

const EditForm: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Chỉnh sửa</h1>
            <div className="flex items-center justify-center mb-4">
                <input
                    type="text"
                    placeholder="Nhập mã số"
                    className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r">Tìm kiếm</button>
            </div>
            <table className="w-full border border-gray-300 text-center">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2 py-1">Mã số</th>
                        <th className="border border-gray-300 px-2 py-1">Họ và tên</th>
                        <th className="border border-gray-300 px-2 py-1">Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-2 py-1">
                            <input type="text" className="border border-gray-300 rounded w-full" />
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                            <input type="text" className="border border-gray-300 rounded w-full" />
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                            <input type="text" className="border border-gray-300 rounded w-full" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded">Xác nhận</button>
            </div>
        </div>
    );
};

export default EditForm;