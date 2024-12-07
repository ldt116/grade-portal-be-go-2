import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import AddSuccess from '../../components/PopUp/AddSuccess';
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

const AddMember: React.FC = () => {


    const [teacherList, setTeacherList] = useState<TeacherInfo[]>([]);
    const [studentList, setStudentList] = useState<StudentInfo[]>([]);

    const [formValue, setFormValue] = useState({
        fullName: '',
        email: '',
        ms: '',
        role: '',
        faculty: ''
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
            fullName: '',
            email: '',
            ms: '',
            role: '',
            faculty: ''
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

        if (formValue.email === '' || formValue.fullName === '' || formValue.ms === '' || formValue.role === '' || formValue.faculty === '') {
            alert("Hãy điền đầy đủ thông tin");
            return;
        }

        if (formValue.role !== 'admin' && formValue.role !== 'teacher' && formValue.role !== 'student') {
            alert("Hãy nhập 1 trong 3 vai trò: admin, teacher hoặc student");
            return;
        }

        const token = localStorage.getItem("BearerToken");
        if (formValue.role === 'admin') {
            try {
                const adminInfo = {
                    email: formValue.email,
                    name: formValue.fullName,
                    faculty: formValue.faculty,
                    ms: formValue.ms
                }
                console.log("Check admin:", adminInfo);
                const addScore = await axios.post(
                    `https://dacnpm.thaily.id.vn/admin/api/create`,
                    adminInfo,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                console.log("Đã thêm admin bằng POST");
            }
            catch (error) {
                console.log("Khong them admin duoc:", error);
                alert("Admin này đã tồn tại, hãy chọn email và mã số khác");
                return;
            }
        }
        else if (formValue.role === 'teacher' || formValue.role === 'student') {
            try {
                const checkDuplicateEmailTeacher = teacherList.find((teacher) => teacher.Email === formValue.email);
                const checkDuplicateEmailStudent = studentList.find((student) => student.Email === formValue.email);

                const checkDuplicateMSTeacher = teacherList.find((teacher) => teacher.Ms === formValue.ms);
                const checkDuplicateMSStudent = studentList.find((student) => student.Ms === formValue.ms);

                if(checkDuplicateEmailStudent || checkDuplicateMSStudent){
                    alert("Sinh viên này đã tồn tại trong hệ thống");
                    return;
                }

                if(checkDuplicateEmailTeacher || checkDuplicateMSTeacher){
                    alert("Giảng viên này đã tồn tại trong hệ thống");
                    return;
                }


                const clientInfo = [{
                    ms: formValue.ms,
                    name: formValue.fullName,
                    email: formValue.email,
                    faculty: formValue.faculty,
                    role: formValue.role
                }]
                console.log("Check client:", clientInfo);
                console.log(token);
                const addScore = await axios.post(
                    `https://dacnpm.thaily.id.vn/admin/api/account/create`,
                    clientInfo,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }
                );
                console.log("Đã thêm client bằng POST");
            }
            catch (error) {
                console.log("Khong them client duoc:", error);
            }
        }
        setPopUp(true);
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>

            <Header />
            <Navbar />

            {/* Nhập thông tin */}
            <div className='w-full flex flex-col items-center justify-normal max-w-5xl mt-5 mb-5 rounded-lg h-[85vh] border border-black my-2'>

                <h2 className='text-5xl mt-5 mb-5 h-[10%]'>Thêm thành viên</h2>

                <form
                    className='w-full flex flex-col h-[90%] '
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col items-center justify-evenly h-[90%]'>
                        {/* Họ và tên */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Họ và tên: </div>
                                <input type="text"
                                    name='fullName'
                                    placeholder='Nhập họ và tên'
                                    value={formValue.fullName}
                                    onChange={handleChange}
                                    className='bg-white border border-black rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                        </div>

                        {/* Email */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Email: </div>
                                <input type="text"
                                    placeholder='Nhập email (đuôi hcmut)'
                                    name='email'
                                    value={formValue.email}
                                    onChange={handleChange}
                                    className='bg-white border border-black rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                        </div>

                        {/* MS */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Mã số: </div>
                                <input type="text"
                                    placeholder='Nhập mã số'
                                    name='ms'
                                    value={formValue.ms}
                                    onChange={handleChange}
                                    className='bg-white border border-black rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                        </div>


                        {/* Môn học */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Vai trò: </div>
                                <input type="text"
                                    placeholder='Nhập mã môn học'
                                    name='role'
                                    value={formValue.role}
                                    onChange={handleChange}
                                    className='bg-white border border-black rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                        </div>

                        {/* Khoa */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Tên khoa: </div>
                                <input type="text"
                                    placeholder='Nhập tên lớp'
                                    name='faculty'
                                    value={formValue.faculty}
                                    onChange={handleChange}
                                    className='bg-white border border-black rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center h-[12%] mt-5 mb-5'>
                        <button className='w-[200px] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'>Xác nhận</button>
                    </div>

                    {popUp && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AddSuccess onClose={changeStatePopup} />
                        </div>
                    )}

                </form>


            </div>

            <Footer />

        </div>

    );
};

export default AddMember;