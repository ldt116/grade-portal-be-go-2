import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';


const GradeInput: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>();
    const options = ['HK 241', 'HK 242', 'HK 111', 'HK 112', '1', '2', '3', '4', '5', '6'];

    const handleOptionClick = (option: string) => {
        setInputValue(option); // Đặt giá trị input là option được chọn
        setIsOpen(false); // Đóng dropdown
    };

    const [fileName, setFileName] = useState<string>('');
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    }

    const prevent_submit_KeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if(event.key === "Enter") event.preventDefault();
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
            {/* <div className='relative top-10'>
            <Navbar/>
            </div> */}
            

            {/* Nhập điểm */}
            <div className='w-full flex flex-col items-center max-w-5xl mt-0 rounded-lg h-[70vh] border border-black my-2'>

                <h2 className='text-5xl mt-5 mb-5'>Nhập điểm</h2>

                <form className='h-[55vh] w-3/4 border bg-gray-200 border-t-4 border-t-blue-500'
                        onKeyDown={prevent_submit_KeyDown}>

                    <div className='flex flex-row justify-center items-center w-1/4 h-[7vh] bg-blue-500 mt-4 ml-4 mb-10 text-white text-xl'>Cập nhật điểm</div>

                    {/* Nhập thông tin môn, lớp, học kì */}
                    <div className='flex flex-row justify-between ml-5 mr-5'>

                        {/* Thông tin môn */}
                        <div className='flex flex-row items-center border border-black rounded-xl bg-white h-[5vh] w-[35%]'>
                            <div className='w-[40%] flex flex-col items-center'>Mã môn học</div>
                            <input type="text"
                                placeholder='Nhập mã môn học'
                                onKeyDown={exit_input}
                                className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                            />
                        </div>

                        {/* Thông tin lớp */}
                        <div className='flex flex-row items-center border border-black rounded-xl bg-white h-[5vh] w-[30%]'>
                            <div className='w-[40%] flex flex-col items-center'>Mã lớp</div>
                            <input type="text"
                                placeholder='Nhập mã lớp'
                                onKeyDown={exit_input}
                                className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2' />
                        </div>

                        {/* Chọn học kì */}
                        <div className='flex flex-row items-center border border-black rounded-xl bg-white h-[5vh] w-[25%]'>
                            <div className='w-[40%] flex flex-col items-center'>Học kì</div>
                            <div className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl border border-l-black'>
                                <input type="text"
                                    placeholder='Chọn học kì'
                                    onKeyDown={exit_input}
                                    onFocus={() => setIsOpen(true)}
                                    value={inputValue || ""}
                                    className='w-[100%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none text-center'
                                    readOnly
                                />
                                {isOpen && (
                                    <ul className="absolute bg-white border mt-1 w-[7%] rounded-xl text-center max-h-40 overflow-y-auto z-10">
                                        {options.map((option, index) => (
                                            <li
                                                key={index}
                                                className="p-2 hover:bg-gray-100 cursor-pointer w-full border border-gray-100"
                                                onClick={() => handleOptionClick(option)} // Xử lý chọn option
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )
                                }
                            </div>

                        </div>
                        
                    </div>

                    <div className='flex flex-col items-center h-[15vh] mt-[7%]'>
                        {/* Chọn file */}
                        <div className='flex justify-between items-center h-[50%]'>
                            <label className='flex items-center px-4 py-3 mr-3 bg-blue-500 text-md text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-colors duration-100'>
                                <span>Chọn file (.csv)</span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className='hidden' />
                            </label>

                        {/* Hiện tên file */}
                            <div className='w-96 p-2 text-center text-md bg-white border border-gray-500 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap'>
                                {fileName ? (<span className='text-gray-700'>{fileName}</span>) : (<span className='text-gray-400'>Tải file lên</span>)}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-center h-14 mt-5'>
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

