import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import AddSuccess from '../../components/PopUp/AddSuccess';

const GradeInput: React.FC = () => {

    const [formValue, setFormValue] = useState({
        fullName: '',
        mail: '',
        mssv: '',
        subject: '',
        class: ''
    })

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [popUp, setPopUp] = useState(false);

    const changeStatePopup = () => {
        setPopUp(!popUp);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

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

        // Kiểm tra tên

        if (!formValue.fullName) {
            newError.fullName = 'Hãy nhập họ và tên!';
            valid = false;
        }

        // Kiểm tra mail

        if (!formValue.mail) {
            newError.mail = 'Hãy nhập email!';
            valid = false;
        }

        // Kiểm tra mssv

        if (!formValue.mssv) {
            newError.mssv = 'Hãy nhập mã số sinh viên!';
            valid = false;
        }
        else if (formValue.mssv.length != 7) {
            newError.mssv = 'Mã số sinh viên không hợp lệ!';
            valid = false;
        }
        else if (!checkDigit(formValue.mssv[0]) || !checkDigit(formValue.mssv[1]) || !checkDigit(formValue.mssv[2]) || !checkDigit(formValue.mssv[3]) || !checkDigit(formValue.mssv[4]) || !checkDigit(formValue.mssv[5]) || !checkDigit(formValue.mssv[6])) {
            newError.mssv = 'Mã số sinh viên không hợp lệ!';
            valid = false;
        }

        // Kiểm tra mã môn

        if (!formValue.subject) {
            newError.subject = 'Hãy nhập mã môn học!';
            valid = false;
        }
        else if (formValue.subject.length != 6) {
            newError.subject = 'Mã môn học không hợp lệ!';
            valid = false;
        }
        else if (!checkLetter(formValue.subject[0]) || !checkLetter(formValue.subject[1]) || !checkDigit(formValue.subject[2]) || !checkDigit(formValue.subject[3]) || !checkDigit(formValue.subject[4]) || !checkDigit(formValue.subject[5])) {
            newError.subject = 'Mã môn học không hợp lệ!';
            valid = false;
        }

        // Kiểm tra lớp

        if (!formValue.class) {
            newError.class = 'Hãy nhập mã lớp học!';
            valid = false;
        }
        else if (formValue.class.length == 4 && (!checkLetter(formValue.class[0]) || !checkLetter(formValue.class[1]) || !checkDigit(formValue.class[2]) || !checkDigit(formValue.class[3]))) {
            newError.class = 'Mã lớp không hợp lệ!';
            valid = false;
        }
        else if (formValue.class.length == 3 && (!checkLetter(formValue.class[0]) || !checkDigit(formValue.class[1]) || !checkDigit(formValue.class[2]))) {
            newError.class = 'Mã lớp không hợp lệ!';
            valid = false;
        }
        else if (formValue.class.length < 3 || formValue.class.length > 4) {
            newError.class = 'Mã lớp không hợp lệ!';
            valid = false;
        }

        setError(newError);
        return valid;

    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form hợp lệ');
            console.log(formValue);
            setFormValue({
                fullName: '',
                mail: '',
                mssv: '',
                subject: '',
                class: ''
            });
            setError({});
            setPopUp(true);
        }
        else {
            console.log('Form không hợp lệ');
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <header className='bg-blue-500 w-full flex flex-col p-4 items-center justify-between h-[10vh]'>I am header</header>
            <nav className='bg-green-200 h-16 w-full text-center'>Chờ chỉnh sau</nav>
            {/* <Navbar /> */}

            {/* Nhập thông tin */}
            <div className='w-full flex flex-col items-center justify-normal max-w-5xl mt-0 rounded-lg h-[85vh] border border-black my-2'>

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
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>
                            {error.fullName && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.fullName}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Email: </div>
                                <input type="text"
                                    placeholder='Nhập email'
                                    name='mail'
                                    value={formValue.mail}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>
                            {error.mail && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.mail}</div>
                            )}
                        </div>

                        {/* MSSV */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Mã số sinh viên: </div>
                                <input type="text"
                                    placeholder='Nhập mã số sinh viên'
                                    name='mssv'
                                    value={formValue.mssv}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>

                            {error.mssv && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.mssv}</div>
                            )}
                        </div>


                        {/* Môn học */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Mã môn học: </div>
                                <input type="text"
                                    placeholder='Nhập mã môn học'
                                    name='subject'
                                    value={formValue.subject}
                                    onChange={handleChange}
                                    className='bg-gray-300 rounded-2xl h-11 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                                <div className='w-[30%]'></div>
                            </div>
                            {error.subject && (
                                <div className='text-red-500 text-sm h-[20%] ml-20'>{error.subject}</div>
                            )}
                        </div>

                        {/* Lớp */}
                        <div className='flex flex-col items-center justify-start h-[100%] w-2/3'>
                            <div className='flex flex-row items-center h-[80%] w-full'>
                                <div className='mr-4 text-xl text-right w-[45%]'>Tên lớp: </div>
                                <input type="text"
                                    placeholder='Nhập tên lớp'
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

            <footer className='h-[15vh] w-full bg-gray-500'>

            </footer>

        </div>

    );
};

export default GradeInput;


