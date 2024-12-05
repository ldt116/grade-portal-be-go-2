import React, { useState } from 'react'; 
import Navbar from '../src/components/Navbar/Navbar';
import AddSuccess from '../src/components/PopUp/AddSuccess';
import Header from '../src/components/HeaderFooter/Header';
import Footer from '../src/components/HeaderFooter/Footer';
import axios from 'axios';

const EditForm: React.FC = () => {
    const [formValue, setFormValue] = useState({ MS: '' });
    const [error, setError] = useState<{ [key: string]: string }>({});
    const [popUp, setPopUp] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null); 
    const [rowData, setRowData] = useState({
        MS: '',
        name: '',
        role: '',
    });

    const changeStatePopup = () => setPopUp(!popUp);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const validateForm = () => {
        let newError: { [key: string]: string } = {};
        let valid = true;

        if (!formValue.MS) {
            newError.MS = 'Nhập mã số';
            valid = false;
        } else if (formValue.MS.length !== 7) {
            newError.MS = 'Mã số không hợp lệ! Mã số phải có đúng 7 ký tự.';
            valid = false;
        } else if (!/^\d{7}$/.test(formValue.MS)) {
            newError.MS = 'Mã số không hợp lệ! Chỉ chứa các chữ số.';
            valid = false;
        }

        setError(newError);
        return valid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.get(`http://domain/admin/api/account/${formValue.MS}`);
                setRowData(response.data);
                setShowResult(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setShowResult(false);
            }
        } else {
            setShowResult(false);
        }
    };

    const handleEdit = (field: string) => {
        setEditingField(field); 
    };

    const handleSave = async () => {
        try {
            const updatedData = { ...rowData };
            await axios.patch(`http://domain/admin/api/account/change/${rowData.MS}`, updatedData);
            setEditingField(null); 
            setPopUp(true); 
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRowData({ ...rowData, [name]: value }); 
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />
            <Navbar />
            <div className='w-full flex flex-col items-center justify-normal max-w-5xl mt-5 mb-5 rounded-lg h-[85vh] border border-black my-2'>
                <h2 className='text-5xl font-bold mt-5 mb-5 h-[10%]'>Chỉnh sửa</h2>
                <form className='w-full flex flex-col h-[80%]' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center justify-start h-[100%] w-2/3 '>
                        <div className='flex flex-row items-center h-[80%] w-full m-2 '>
                            <div className='mr-4 text-xl text-right w-[45%]'>Mã số: </div>
                            <input
                                type="text"
                                placeholder='Nhập mã số'
                                name='MS'
                                value={formValue.MS}
                                onChange={handleChange}
                                className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none'
                                required
                            />
                        </div>
                        {error.MS && <div className='text-red-500 text-sm h-[20%] ml-20'>{error.MS}</div>}
                    </div>
                    <div className='flex flex-col items-center justify-center h-[20%] mt-5 mb-5'>
                        <button type="submit" className='w-[20%] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'>Tìm kiếm</button>
                    </div>

                    {showResult && (
                        <>
                            <div className="w-full flex justify-center mb-6">
                                <table className="table-auto items-center w-2/3 border-collapse border border-gray-400">
                                    <thead>
                                        <tr className="bg-blue-500 text-white">
                                            <th className="border border-gray-400 px-4 py-2">Mã số</th>
                                            <th className="border border-gray-400 px-4 py-2">Họ và tên</th>
                                            <th className="border border-gray-400 px-4 py-2">Vai trò</th>
                                            <th className="border border-gray-400 px-4 py-2">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-gray-100">
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {editingField === 'MS' ? (
                                                    <input
                                                        type="text"
                                                        name="MS"
                                                        value={rowData.MS}
                                                        onChange={handleFieldChange}
                                                        className="border border-gray-300 rounded p-2"
                                                    />
                                                ) : (
                                                    rowData.MS
                                                )}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {editingField === 'name' ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={rowData.name}
                                                        onChange={handleFieldChange}
                                                        className="border border-gray-300 rounded p-2"
                                                    />
                                                ) : (
                                                    rowData.name
                                                )}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {editingField === 'role' ? (
                                                    <input
                                                        type="text"
                                                        name="role"
                                                        value={rowData.role}
                                                        onChange={handleFieldChange}
                                                        className="border border-gray-300 rounded p-2"
                                                    />
                                                ) : (
                                                    rowData.role
                                                )}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2 text-center">
                                                {editingField ? (
                                                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                                        Lưu
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit('MS')}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                            Sửa MS
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit('name')}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                        >
                                                            Sửa Tên
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit('role')}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Sửa Vai trò
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='flex flex-col items-center justify-center h-[20%] mt-5 mb-5'>
                                <button className='w-[20%] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'>Xác nhận</button>
                            </div>
                        </>
                    )}
                </form>
                {popUp && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <AddSuccess onClose={changeStatePopup} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EditForm;
