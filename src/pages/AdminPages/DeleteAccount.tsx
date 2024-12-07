import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/HeaderFooter/Header';
import Footer from '../../components/HeaderFooter/Footer';
import axios from 'axios';

interface TeacherInfo {
    ID: string,
    Email: string,
    Name: string,
    Ms: string,
    Faculty: string,
    Role: string,
    CreatedBy: string,
    ExpiredAt: string,
}

interface StudentInfo {
    ID: string,
    Email: string,
    Name: string,
    Ms: string,
    Faculty: string,
    Role: string,
    CreatedBy: string,
    ExpiredAt: string,
}

const DeleteMember: React.FC = () => {


    const [teacherList, setTeacherList] = useState<TeacherInfo[]>([]);
    const [studentList, setStudentList] = useState<StudentInfo[]>([]);

    const [deletedStudent, setDeletedStudent] = useState<StudentInfo>();
    const [deletedTeacher, setDeletedTeacher] = useState<TeacherInfo>();


    const [formValue, setFormValue] = useState({
        email: '',
        ms: '',
        role: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    const [popUp, setPopUp] = useState(false);

    const changeStatePopup = () => {
        setPopUp(!popUp);
        setFormValue({
            email: '',
            ms: '',
            role: '',
        })
    }

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const token = localStorage.getItem("BearerToken");
                console.log("Check token:", token)
                const teachers = await axios.get(
                    `https://dacnpm.thaily.id.vn/admin/api/account/teacher`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = teachers.data;

                // Duyệt qua danh sách lớp và lưu các thuộc tính cần thiết
                const formattedTeacher = data.foundedUser.map((teacherItem: any) => ({
                    ID: teacherItem.ID,
                    Email: teacherItem.Email,
                    Name: teacherItem.Name,
                    Ms: teacherItem.Ms,
                    Faculty: teacherItem.Faculty,
                    Role: teacherItem.Role,
                    CreatedBy: teacherItem.CreatedBy,
                    ExpiredAt: teacherItem.ExpiredAt,
                }));

                setTeacherList(formattedTeacher);

            } catch (error) {
                console.error("Failed to fetch teacher info:", error);
            }
        };

        const fetchStudent = async () => {
            try {
                const token = localStorage.getItem("login");
                const students = await axios.get(
                    `https://dacnpm.thaily.id.vn/admin/api/account/student`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = students.data;

                // Duyệt qua danh sách lớp và lưu các thuộc tính cần thiết
                const formattedStudent = data.foundedUser.map((StudentItem: any) => ({
                    ID: StudentItem.ID,
                    Email: StudentItem.Email,
                    Name: StudentItem.Name,
                    Ms: StudentItem.Ms,
                    Faculty: StudentItem.Faculty,
                    Role: StudentItem.Role,
                    CreatedBy: StudentItem.CreatedBy,
                    ExpiredAt: StudentItem.ExpiredAt,
                }));

                setStudentList(formattedStudent);

            } catch (error) {
                console.error("Failed to fetch student info:", error);
            }
        };

        fetchTeacher();
        fetchStudent();

    }, []);

    // Check thông tin GV và SV

    useEffect(() => {
        console.log("Teacher list updated:", teacherList);
    }, [teacherList]);

    useEffect(() => {
        console.log("Student list updated:", studentList);
    }, [studentList]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (formValue.email === '' || formValue.ms === '' || formValue.role === '') {
            alert("Hãy điền đầy đủ thông tin");
            return;
        }

        if (formValue.role !== 'admin' && formValue.role !== 'teacher' && formValue.role !== 'student') {
            alert("Hãy nhập 1 trong 2 vai trò: teacher hoặc student");
            return;
        }

        const token = localStorage.getItem("BearerToken");

        const checkExistEmailTeacher = teacherList.find((teacher) => teacher.Email === formValue.email);
        const checkExistEmailStudent = studentList.find((student) => student.Email === formValue.email);

        const checkExistMSTeacher = teacherList.find((teacher) => teacher.Ms === formValue.ms);
        const checkExistMSStudent = studentList.find((student) => student.Ms === formValue.ms);

        setDeletedStudent(checkExistEmailStudent);
        setDeletedTeacher(checkExistEmailTeacher);

        if (formValue.role === 'student' && !checkExistEmailStudent && !checkExistMSStudent) {
            alert("Sinh viên không có trong hệ thống");
            return;
        }

        if (formValue.role === 'teacher' && !checkExistEmailTeacher && !checkExistMSTeacher) {
            alert("Giảng viên không có trong hệ thống");
            return;
        }

        if (formValue.role === 'student') {
            try {
                const studentId = checkExistEmailStudent?.ID;
                console.log("Check student id:", studentId);
                const deleteStudent = await axios.delete(
                    `https://dacnpm.thaily.id.vn/admin/api/account/delete/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                console.log("Đã xóa student");
            } catch (error) {
                console.log("Không xóa được student");
            }
        }
        else {
            try {
                const teacherId = checkExistEmailTeacher?.ID;
                console.log("Check teacher id:", teacherId);
                const deleteStudent = await axios.delete(
                    `https://dacnpm.thaily.id.vn/admin/api/account/delete/${teacherId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                console.log("Đã xóa teacher");
            } catch (error) {
                console.log("Không xóa được teacher");
            }
        }
        setPopUp(true);
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>

            <Header />
            <Navbar />

            {/* Nhập thông tin */}
            <div className='w-full flex flex-col items-center justify-normal bg-white max-w-5xl mt-5 mb-5 rounded-lg h-[50vh] border border-black my-2'>

                <h2 className='text-4xl font-medium mt-5 mb-5 h-[10%]'>Xóa tài khoản</h2>

                <form
                    className='w-full flex flex-col h-[90%] mt-10 '
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-row items-center justify-around h-[50%]'>

                        {/* Email */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-[25%]  '>

                            <div className=' mb-4 text-xl font-medium text-right '>Email </div>
                            <input type="text"
                                placeholder='Nhập email (đuôi hcmut)'
                                name='email'
                                value={formValue.email}
                                onChange={handleChange}
                                className='bg-white border border-gray-300 rounded-xl text-md h-10 w-full p-6 placeholder:text-center text-left focus:outline-none' />


                        </div>

                        {/* MS */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-[25%]  '>

                            <div className='mr-4 mb-4 text-xl font-medium text-right '>Mã số </div>
                            <input type="text"
                                placeholder='Nhập mã số'
                                name='ms'
                                value={formValue.ms}
                                onChange={handleChange}
                                className='bg-white border border-gray-300 rounded-xl text-md h-10 w-full p-6 placeholder:text-center text-left focus:outline-none' />


                        </div>

                        {/* Vai trò */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-[25%]  '>

                            <div className='mr-4 mb-4 text-xl font-medium text-right '>Vai trò </div>
                            <input type="text"
                                placeholder='Nhập vai trò'
                                name='role'
                                value={formValue.role}
                                onChange={handleChange}
                                className='bg-white border border-gray-300 rounded-xl text-md h-10 w-full p-6 placeholder:text-center text-left focus:outline-none' />


                        </div>

                    </div>

                    <div className='flex flex-col items-center justify-center h-[30%] '>
                        <button className='w-[130px] h-[70%] bg-blue-600 rounded-xl text-white text-xl hover:bg-blue-700 duration-150'>Xác nhận</button>
                    </div>

                    {popUp && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                            <div className="bg-white border border-gray-500 rounded-xl p-4 flex flex-col justify-evenly items-center text-lg font-normal">
                                <h2 className="text-2xl font-semibold mb-4">Thông tin tài khoản</h2>

                                {formValue.role === 'student' && deletedStudent ? (
                                    <div className="text-center">
                                        <p>Họ và tên: {deletedStudent.Name}</p>
                                        <p>Email: {deletedStudent.Email}</p>
                                        <p>Mã số: {deletedStudent.Ms}</p>
                                        <p>Vai trò: {deletedStudent.Role}</p>
                                    </div>
                                ) : formValue.role === 'teacher' && deletedTeacher ? (
                                    <div className="text-center">
                                        <p>Họ và tên: {deletedTeacher.Name}</p>
                                        <p>Email: {deletedTeacher.Email}</p>
                                        <p>Mã số: {deletedTeacher.Ms}</p>
                                        <p>Vai trò: {deletedTeacher.Role}</p>
                                    </div>
                                ) : (
                                    <p className="text-red-500">Không tìm thấy thông tin tài khoản.</p>
                                )}

                                <button
                                    type='button'
                                    className="bg-red-600 text-white w-[30%] h-[50px] mt-4 rounded-xl text-2xl hover:bg-red-700 duration-150"
                                    onClick={changeStatePopup}>
                                    Xóa
                                </button>

                            </div>
                        </div>
                    )}

                </form>


            </div>

            <Footer />

        </div>

    );
};

export default DeleteMember;