import React, { useState } from 'react'

const GradeInput: React.FC = () => {

    const prevent_submit_KeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    }
    const exit_input = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            event.currentTarget.blur();
        }
    }

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <header className='bg-blue-500 w-full flex flex-col p-4 items-center justify-between h-[10vh]'>I am header</header>
            <nav className='bg-green-200 h-16 w-full text-center'>Chờ chỉnh sau</nav>
            {/* <Navbar /> */}

            {/* Nhập thông tin */}
            <div className='w-full flex flex-col items-center max-w-5xl mt-0 rounded-lg h-[70vh] border border-black my-2'>

                <h2 className='text-5xl mt-7 mb-7'>Quản lí thành viên</h2>

                <form className='w-full flex flex-col justify-evenly'
                        onKeyDown={prevent_submit_KeyDown}>
                    <div className='flex flex-col items-center justify-between h-12'>
                        {/* Họ và tên */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Họ và tên: </div>
                            <input type="text" 
                                    placeholder='Nhập họ và tên' 
                                    onKeyDown={exit_input} 
                                    className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Email: </div>
                            <input type="text" 
                                    placeholder='Nhập email' 
                                    onKeyDown={exit_input} 
                                    className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* MSSV */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Mã số sinh viên: </div>
                            <input type="text" 
                                    placeholder='Nhập mã số sinh viên' 
                                    onKeyDown={exit_input} 
                                    className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                        {/* Vai trò */}
                        <div className='flex flex-row items-center h-[100%] w-2/3 m-2'>
                            <div className='mr-4 text-xl text-right w-[45%]'>Vai trò: </div>
                            <input type="text" 
                                    placeholder='Nhập vai trò' 
                                    onKeyDown={exit_input} 
                                    className='bg-gray-300 rounded-2xl h-10 w-[55%] p-4 placeholder:text-center text-left focus:outline-none' />
                            <div className='w-[30%]'></div>
                        </div>

                
                    </div>

                    <div className='flex flex-row items-center justify-between w-2/3 mt-64 ml-40'>
                        <button className='w-[20%] h-14 bg-[#0388B4] rounded-full text-white text-2xl'>Thêm</button>
                        <button className='w-[20%] h-14 bg-red-600 rounded-full text-white text-2xl'>Xóa</button>
                    </div>
                    
                </form>


            </div>

            <footer className='h-[15vh] w-full bg-gray-500'>

            </footer>

        </div>

    );
};

export default GradeInput;


