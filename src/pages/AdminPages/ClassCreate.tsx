import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';

interface ClassData {
    subjectCode: string;
    classCode: string;
    className: string;
    teacherName: string;
    studentListFile: File | null;
}

interface CreateClassFormProps {
    onSubmit: (classData: ClassData) => void;
}


const ClassCreate: React.FC<CreateClassFormProps> = ({ onSubmit }) => {
    const [classData, setClassData] = useState<ClassData>({
        subjectCode: '',
        classCode: '',
        className: '',
        teacherName: '',
        studentListFile: null,
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const options = ['L', 'CC', 'TN'];

    const handleOptionClick = (option: string) => {
        setInputValue(option);
        setIsOpen(false);
    };

    const [status, setStatus] = useState('Hoàn tất!!!');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setClassData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setClassData((prev) => ({ ...prev, studentListFile: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(classData);
        setStatus('Hoàn tất!!!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Tạo Lớp</h2>

            <div className="mb-4">
                <label className="block text-gray-700">Mã Môn Học</label>
                <input
                    type="text"
                    name="subjectCode"
                    value={classData.subjectCode}
                    onChange={handleChange}
                    placeholder="Nhập mã môn học"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4 relative">
                <label className="block text-gray-700">Chọn Mã Lớp</label>
                    <input type="text"
                    placeholder='Chọn mã lớp'
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 50)}
                    value={inputValue}
                    className="w-full p-2 border border-gray-300 rounded cursor-pointer bg-white"
                    readOnly
                    />
                    

                {isOpen && (
                    <div className="absolute bg-white border mt-1 w-full rounded shadow-lg">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Tên Lớp</label>
                <input
                    type="text"
                    name="className"
                    value={classData.className}
                    onChange={handleChange}
                    placeholder="Nhập tên lớp"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Giảng Viên đứng lớp</label>
                <input
                    type="text"
                    name="teacherName"
                    value={classData.teacherName}
                    onChange={handleChange}
                    placeholder="Mã giảng viên"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Tải Danh Sách Sinh Viên</label>
                <input type="file" accept=".csv" onChange={handleFileChange} className="w-full" />
            </div>

            <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Trạng Thái</label>
                <span className="text-blue-600 font-semibold">{status}</span>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
                Xác nhận
            </button>
        </form>
    );
};

export default ClassCreate;