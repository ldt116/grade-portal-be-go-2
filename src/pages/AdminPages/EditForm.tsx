import React, { useState } from 'react';
import axios from 'axios';

const EditForm: React.FC = () => {
    const [code, setCode] = useState<string>(''); // State for code
    const [role, setRole] = useState<string>(''); // State for role
    const [users, setUsers] = useState<any[]>([]); // State for fetched users
    const [name, setName] = useState<string>(''); // State for name
    const [faculty, setFaculty] = useState<string>(''); // State for faculty
    const [newRole, setNewRole] = useState<string>(''); // State for new role

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = event.target.value;
        if (field === 'code') setCode(value);
        if (field === 'name') setName(value);
        if (field === 'faculty') setFaculty(value);
    };

    const handleRoleClick = (selectedRole: string) => {
        setRole(selectedRole);
    };

    const handleSubmit = async () => {
        if (!code || !role) {
            alert('Vui lòng nhập mã số và chọn vai trò!');
            return;
        }

        try {
            const token = localStorage.getItem('BearerToken');
            if (!token) {
                alert('Không tìm thấy Bearer Token, vui lòng đăng nhập lại.');
                return;
            }

            const url = `https://dacnpm.thaily.id.vn/admin/api/account/${role}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const allUsers = response.data.foundedUser;
            const matchingUsers = allUsers.filter((user: any) => user.Ms === code);

            if (matchingUsers.length > 0) {
                setUsers(matchingUsers);
            } else {
                setUsers([]);
                alert('Không tìm thấy user có mã số tương ứng.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            alert('Gửi thất bại, vui lòng thử lại.');
        }
    };

    const handleUpdate = async (userId: string) => {
        if (!(name && faculty && newRole)) {
            alert('Vui lòng nhập các thông tin để cập nhật.');
            return;
        }

        try {
            const token = localStorage.getItem('BearerToken');
            if (!token) {
                alert('Không tìm thấy Bearer Token, vui lòng đăng nhập lại.');
                return;
            }

            const url = `https://dacnpm.thaily.id.vn/admin/api/account/change/${userId}`;
            const updateBody = {
                ...(name && { name }),
                ...(faculty && { faculty }),
                ...(newRole && { role: newRole }),
            };

            const response = await axios.patch(url, updateBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            alert('Cập nhật thành công!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Cập nhật thất bại, vui lòng thử lại.');
        }
    };

    return (
        <div className='mt-40 flex flex-col items-center min-h-screen bg-gray-100'>
            <div className='w-full flex flex-col items-center justify-normal max-w-5xl mt-5 mb-5 rounded-lg h-[85vh] border border-black my-2'>
                <h1 className='text-2xl font-bold mt-5'>Nhập thông tin</h1>
                <div className='mt-5 flex flex-col items-center'>
                    <input
                        type="text"
                        placeholder="Nhập mã số"
                        value={code}
                        onChange={(e) => handleInputChange(e, 'code')}
                        className='p-2 border border-gray-400 rounded-lg w-80 focus:outline-none focus:border-blue-500'
                    />

                    <div className='mt-5 flex gap-4'>
                        <button
                            onClick={() => handleRoleClick('teacher')}
                            className={`px-4 py-2 rounded-lg ${
                                role === 'teacher' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                            }`}
                        >
                            Giảng viên
                        </button>
                        <button
                            onClick={() => handleRoleClick('student')}
                            className={`px-4 py-2 rounded-lg ${
                                role === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                            }`}
                        >
                            Sinh viên
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='mt-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                    >
                        Tìm
                    </button>
                </div>

                {users.length > 0 && (
                    <div className='mt-10 w-full px-10'>
                        <h2 className='text-xl font-bold mb-5'>Danh sách người dùng</h2>
                        <table className='table-auto border-collapse border border-gray-400 w-full'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='border border-gray-400 px-4 py-2'>Mã Số</th>
                                    <th className='border border-gray-400 px-4 py-2'>Tên</th>
                                    <th className='border border-gray-400 px-4 py-2'>Khoa</th>
                                    <th className='border border-gray-400 px-4 py-2'>Vai trò</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.ID} className='text-center'>
                                        <td className='border border-gray-400 px-4 py-2'>{user.Ms}</td>
                                        <td className='border border-gray-400 px-4 py-2'>{user.Name}</td>
                                        <td className='border border-gray-400 px-4 py-2'>{user.Faculty}</td>
                                        <td className='border border-gray-400 px-4 py-2'>{user.Role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Form for updating user information */}
                        <div className='mt-5 flex items-center gap-4'>
                            <input
                                type="text"
                                placeholder="Nhập tên mới"
                                value={name}
                                onChange={(e) => handleInputChange(e, 'name')}
                                className='p-2 border border-gray-400 rounded-lg w-1/3 focus:outline-none focus:border-blue-500'
                            />
                            <input
                                type="text"
                                placeholder="Nhập khoa mới"
                                value={faculty}
                                onChange={(e) => handleInputChange(e, 'faculty')}
                                className='p-2 border border-gray-400 rounded-lg w-1/3 focus:outline-none focus:border-blue-500'
                            />
                            <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className='p-2 border border-gray-400 rounded-lg w-1/3 focus:outline-none focus:border-blue-500'
                            >
                                <option value="" disabled>Chọn vai trò mới</option>
                                <option value="teacher">Giảng viên</option>
                                <option value="student">Sinh viên</option>
                            </select>
                        </div>

                        <button
                            onClick={() => handleUpdate(users[0].ID)} // Replace with the correct user ID
                            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 items-center justify-normal'
                        >
                            Cập nhật
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditForm;
