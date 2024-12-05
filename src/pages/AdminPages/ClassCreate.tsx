import React, { useState } from 'react'
import Navbar from '../src/component/Navbar/Navbar';
import AddSuccess from '../src/component/PopUp/AddSuccess';
import Header from '../src/component/HeaderFooter/Header';
import Footer from '../src/component/HeaderFooter/Footer';
import axios from 'axios';

const ClassCreate: React.FC = () => {

    const [formValue, setFormValue] = useState({
        MMM: '',
        ML: '',
        class: '',
        teacher: '',
        file: ''
    })
    const MLOptions = ['L', 'CC', 'TN'];

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [popUp, setPopUp] = useState(false);

    const changeStatePopup = () => {
        setPopUp(!popUp);
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };


    const checkLetter = (c: string) => {
        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) return true;
        return false;
    }

    const checkDigit = (c: string) => {
        if (c >= '0' && c <= '9') return true;
        return false;
    }

    const validateForm = () => {
        let newError: { [key: string]: string } = {};
        let valid = true;


        if (!formValue.MMM) {
            newError.MMM = 'Nhập Mã môn học';
            valid = false;
        }
        else if (formValue.MMM.length != 6) {
            newError.MMM = 'Mã môn học không hợp lệ!';
            valid = false;
        }
        else if (!checkLetter(formValue.MMM[0]) || !checkLetter(formValue.MMM[1]) || !checkDigit(formValue.MMM[2]) || !checkDigit(formValue.MMM[3]) || !checkDigit(formValue.MMM[4]) || !checkDigit(formValue.MMM[5])) {
            newError.MMM = 'Mã môn học không hợp lệ!';
            valid = false;
        }


        if (!formValue.ML) {
            newError.ML = 'Chọn mã lớp';
            valid = false;
        }

        if (!formValue.class) {
            newError.class = 'Nhập tên lớp';
            valid = false;
        }

        if (!formValue.teacher) {
            newError.teacher = 'Nhập mã giảng viên';
            valid = false;
        }
        else if (formValue.teacher.length != 7) {
            newError.teacher = 'Mã giảng viên không hợp lệ!';
            valid = false;
        }
        else if (!checkDigit(formValue.teacher[0]) || !checkDigit(formValue.teacher[1]) || !checkDigit(formValue.teacher[2]) || !checkDigit(formValue.teacher[3]) || !checkDigit(formValue.teacher[4]) || !checkDigit(formValue.teacher[5]) || !checkDigit(formValue.teacher[6])) {
            newError.teacher = 'Mã giảng viên không hợp lệ!';
            valid = false;
        }

        if (!formValue.file) {
            newError.file = 'Chưa có Danh sách Sinh viên';
            valid = false;
        }

        setError(newError);
        return valid;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form hợp lệ');
            console.log(formValue);
    
            try {
                // Gửi dữ liệu lớp học lên server
                const response = await axios.post('/class/create', {
                    MMM: formValue.MMM,
                    ML: formValue.ML,
                    className: formValue.class,
                    teacherId: formValue.teacher,
                });
    
                if (response.data.code === "success") {
                    console.log("Tạo lớp thành công:", response.data);
    
                    // Upload danh sách sinh viên nếu file được chọn
                    if (formValue.file && formValue.ML) {
                        const file = document.querySelector<HTMLInputElement>("#file-upload")?.files?.[0];
                        if (file) {
                            await uploadStudentList(file, formValue.ML);
                        }
                    }
    
                    // Reset form và hiển thị popup
                    setFormValue({
                        MMM: '',
                        ML: '',
                        class: '',
                        teacher: '',
                        file: ''
                    });
                    setError({});
                    setPopUp(true); // Hiển thị popup khi thành công
                } else {
                    console.error("Lỗi:", response.data.message);
                    alert("Có lỗi xảy ra: " + response.data.message);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API tạo lớp:", error);
                alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
            }
        } else {
            console.log('Form không hợp lệ');
        }
    };
    const uploadStudentList = async (file: File, classId: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('classId', classId);
    
        try {
            const response = await axios.post('/class/upload-student-list', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.code === "success") {
                console.log("Upload danh sách sinh viên thành công:", response.data);
                setPopUp(true); // Hiển thị popup khi upload thành công
            } else {
                console.error("Lỗi:", response.data.message);
                alert("Có lỗi xảy ra: " + response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API upload:", error);
            alert("Không thể kết nối đến server. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>

            <Header/>
            <Navbar/>

            <div className='w-full flex flex-col items-center justify-normal max-w-5xl mt-5 mb-5 rounded-lg h-[85vh] border border-black my-2'>

                <h2 className='text-5xl font-bold mt-5 mb-5 h-[10%]'>Tạo Lớp</h2>

                <form
                    className='w-full flex flex-col h-[90%] '
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col items-center justify-evenly h-[90%]'>
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Mã Môn học: </div>
                                <input type="text"
                                    name='MMM'
                                    placeholder='Nhập Mã Môn học'
                                    value={formValue.MMM}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>
                            {error.MMM && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.MMM}</div>
                            )}
                        </div>

                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Mã lớp: </div>
                                <select 
                                    name='ML'
                                    value={formValue.ML}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-2 text-center focus:outline-none leading-[2.5rem] placeholder-opacity-50 opacity-80'
>
                                <option value="" disabled>Chọn lớp</option>
                                {MLOptions.map((className, index) => (
                                    <option key={index} value={className}>{className}</option>
                                ))}
                                </select> 
                                <div className='w-[30%]'></div>
                            </div>
                            {error.ML && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.ML}</div>
                            )}
                        </div>

                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Tên lớp: </div>
                                <input type="text"
                                    placeholder='Nhập Tên lớp'
                                    name='class'
                                    value={formValue.class}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                            {error.class && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.class}</div>
                            )}
                        </div>

                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Giảng viên đứng lớp: </div>
                                <input type="text"
                                    placeholder='Nhập mã giảng viên'
                                    name='teacher'
                                    value={formValue.teacher}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>
                            {error.teacher && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.teacher}</div>
                            )}
                        </div>

                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Tải Danh sách sinh viên: </div>
                                <label
                                    htmlFor="file-upload"
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name="file"
                                        accept=".csv"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                setFormValue({
                                                    ...formValue,
                                                    file: file.name, 
                                                });
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                <div className='w-[30%]'></div>
                            </div>
                            {formValue.file && (
                                <div className='text-green-600 text-sm h-[20%] ml-20'>Đã chọn: {formValue.file}</div>
                            )}
                            {error.file && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.file}</div>
                            )}
                        </div>

                        </div>    
                        <div className='flex flex-col items-center justify-center h-[12%] mt-5 mb-5'>
                            <button className='w-[20%] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'>Xác nhận</button>
                        </div>

                        {popUp && (
                            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <AddSuccess onClose={changeStatePopup}/>
                            </div>
                        )}

                </form>


            </div>

            <Footer/>


        </div>

    );
};


export default ClassCreate;


