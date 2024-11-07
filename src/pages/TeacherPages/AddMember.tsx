import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';


const GradeInput: React.FC = () => {


    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <header className='bg-blue-500 w-full flex flex-col p-4 items-center justify-between h-[10vh]'>I am header</header>
            <Navbar />

            {/* Nhập thông tin */}
            <div className='w-full flex flex-col items-center max-w-5xl mt-0 rounded-lg h-[70vh] border border-black my-2'>

                <h2 className='text-5xl mt-5 mb-5'>Thêm thành viên</h2>

                <form className='w-full flex flex-col justify-evenly'>
                    <div className='flex flex-col items-center justify-between h-12 w-'>
                        {/* Họ và tên */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Họ và tên: </div>
                            <input type="text" placeholder='Nhập họ và tên' className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Email: </div>
                            <input type="text" placeholder='Nhập email' className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* MSSV */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Mã số sinh viên: </div>
                            <input type="text" placeholder='Nhập mã số sinh viên' className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* Môn học */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Mã môn học: </div>
                            <input type="text" placeholder='Nhập mã môn học' className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* Lớp */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Tên lớp: </div>
                            <input type="text" placeholder='Nhập tên lớp' className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center h-14 mt-64'>
                        <button className='w-[20%] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'>Xác nhận</button>
                    </div>
                    
                </form>


            </div>

            <footer className='h-[15vh] w-full bg-gray-500'>

            </footer>

        </div>

    );
};

export default GradeInput;


