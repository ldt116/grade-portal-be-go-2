import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import AddSuccess from '../../components/PopUp/AddSuccess';
import Header from '../../components/HeaderFooter/Header';
import Footer from '../../components/HeaderFooter/Footer';


const GradeInput: React.FC = () => {
    const [formValue, setFormValue] = useState({
        subject: '',
        class: '',
        semester: '',
        // gradeFile: 
    });

    const [popUp, setPopUp] = useState(false);

    const changeStatePopup = () => {
        setPopUp(!popUp);
    }

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [fileGrade, setFileGrade] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Lưu tên file
            setFileGrade(file);
            setError({ ...error, gradeFile: '' });
        }
        else {
            setFileName('');
            setFileGrade(null);
        }
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        // Kiểm tra mã môn học

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

        // Kiểm tra mã lớp học

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

        // Kiểm tra học kì

        if (!formValue.semester) {
            newError.semester = 'Hãy nhập học kì!';
            valid = false;
        }
        else if (formValue.semester.length != 3) {
            newError.semester = 'Thông tin không hợp lệ!';
            valid = false;
        }
        else if (!checkDigit(formValue.semester[0]) || !checkDigit(formValue.semester[1]) || !checkDigit(formValue.semester[2])) {
            newError.semester = 'Thông tin không hợp lệ!';
            valid = false;
        }

        // Kiểm tra file

        if (!fileGrade) {
            newError.gradeFile = 'Hãy upload file điểm!';
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
                subject: '',
                class: '',
                semester: '',
            });
            setFileGrade(null);
            setFileName('');
            setError({});
            setPopUp(true);
        }
        else {
            console.log('Form không hợp lệ');
        }
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>

            <Header/>
            <Navbar/>
            {/* Nhập điểm */}
            <div className='w-full flex flex-col items-center max-w-6xl my-5 rounded-lg h-[70vh] border border-black'>

                <h2 className='text-5xl my-5'>Nhập điểm</h2>

                <form
                    onSubmit={handleSubmit}
                    className='h-[90%] w-[80%] border bg-gray-200 border-t-4 border-t-blue-500'
                >
                    <div className='flex flex-row justify-center items-center w-[20%] h-[7vh] bg-blue-500 rounded-xl mt-4 ml-4 mb-10 text-white text-xl overflow-hidden whitespace-nowrap text-ellipsis '>Cập nhật điểm</div>

                    {/* Nhập thông tin môn, lớp, học kì */}
                    {/* Màn hình lớn */}
                    <div className='hidden md:flex flex-row justify-between m-5 h-[25%]'>

                        {/* Thông tin môn */}
                        <div className='flex flex-col items-center h-[65%] w-[35%]'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl h-[60%] w-full'>
                                <div className='w-[40%] flex flex-col items-center overflow-hidden whitespace-nowrap'>Mã môn học</div>
                                <input
                                    type="text"
                                    placeholder='Nhập mã môn học'
                                    name='subject'
                                    value={formValue.subject}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.subject && (
                                <div className='text-red-500 text-sm text-center mt-3 h-[40%]'>{error.subject}</div>
                            )}
                        </div>

                        {/* Thông tin lớp */}
                        <div className='flex flex-col items-center h-[65%] w-[35%]'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl h-[60%] w-full'>
                                <div className='w-[40%] flex flex-col items-center'>Mã lớp</div>
                                <input type="text"
                                    placeholder='Nhập mã lớp học'
                                    name='class'
                                    value={formValue.class}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.class && (
                                <div className="text-red-500 text-sm text-center mt-3 h-[40%]">{error.class}</div>
                            )}
                        </div>

                        {/* Chọn học kì */}
                        <div className='flex flex-col items-center h-[65%] w-[25%]'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl h-[60%] w-full'>
                                <div className='w-[40%] flex flex-col items-center'>Học kì</div>
                                <input type="text"
                                    placeholder='Nhập học kì'
                                    name='semester'
                                    value={formValue.semester}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.semester && (
                                <div className="text-red-500 text-sm text-center mt-3 h-[40%] ">{error.semester}</div>
                            )}
                        </div>
                    </div>

                    <div className='hidden md:flex flex-col items-center h-[25%] w-full'>
                        {/* Chọn file */}
                        <div className='flex flex-row justify-center items-center w-[80%] h-[50%]'>
                            <label className='flex items-center px-3 py-3 mr-3 bg-blue-500 text-md text-white rounded-xl overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:bg-blue-600 transition-colors duration-100'>
                                <div>Chọn file (.csv)</div>
                                <input
                                    type="file"
                                    name='gradeFile'
                                    accept='.csv'
                                    // value={fileGrade}
                                    onChange={handleFileChange}
                                    className='hidden'
                                />

                            </label>

                            {/* Hiện tên file */}
                            <div className='flex flex-col justify-center w-[50%] h-[75%] p-2 text-center text-md bg-white border border-gray-500 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap'>
                                {fileGrade ? (
                                    <div className="text-md text-gray-700">{fileName}</div>
                                ) : (
                                    <div className="text-md text-gray-400">Upload file điểm</div>
                                )}
                            </div>
                        </div>
                        {error.gradeFile && (
                            <div className="text-red-500 text-sm ml-36">{error.gradeFile}</div>
                        )}
                    </div>

                    <div className='hidden md:flex flex-col items-center justify-center h-14 mt-2'>
                        <button
                            className='w-[200px] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'
                            type='submit'>
                            Cập nhật điểm
                        </button>

                    </div>

                    
                    {/* Màn hình nhỏ */}
                    <div className='md:hidden flex flex-col items-center justify-between ml-5 mr-5'>

                        {/* Thông tin môn */}
                        <div className='flex flex-row items-center justify-normal mb-5 h-[5vh] w-full'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl  h-full w-[55%] '>
                                <div className='w-[40%] flex flex-col items-center overflow-hidden whitespace-nowrap text-ellipsis'>Mã môn học</div>
                                <input
                                    type="text"
                                    placeholder='Nhập mã môn học'
                                    name='subject'
                                    value={formValue.subject}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.subject && (
                                <div className='text-red-500 text-sm text-center mt-4 ml-2 h-full w-[45%]'>{error.subject}</div>
                            )}
                        </div>

                        {/* Thông tin lớp */}
                        <div className='flex flex-row items-center justify-normal mb-5 h-[5vh] w-full'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl  h-full w-[55%]'>
                                <div className='w-[40%] flex flex-col items-center overflow-hidden whitespace-nowrap text-ellipsis'>Mã lớp</div>
                                <input type="text"
                                    placeholder='Nhập mã lớp học'
                                    name='class'
                                    value={formValue.class}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.class && (
                                <div className="text-red-500 text-sm text-center mt-4 ml-2 h-full w-[45%]">{error.class}</div>
                            )}
                        </div>

                        {/* Chọn học kì */}
                        <div className='flex flex-row items-center justify-normal mb-5 h-[5vh] w-full'>
                            <div className='flex flex-row items-center bg-white border border-black rounded-xl  h-full w-[55%]'>
                                <div className='w-[40%] flex flex-col items-center overflow-hidden whitespace-nowrap text-ellipsis'>Học kì</div>
                                <input type="text"
                                    placeholder='Nhập học kì'
                                    name='semester'
                                    value={formValue.semester}
                                    onChange={handleChange}
                                    className='w-[60%] h-[100%] rounded-tr-xl rounded-br-xl focus:outline-none border border-l-black p-2'
                                />

                            </div>
                            {error.semester && (
                                <div className="text-red-500 text-sm text-center mt-4 ml-2 h-full w-[45%]">{error.semester}</div>
                            )}
                        </div>
                    </div>

                    <div className='md:hidden flex flex-col items-center h-[20%] w-full mt-4'>
                        {/* Chọn file */}
                        <div className='flex justify-between items-center w-[80%] h-[50%]'>
                            <label className='flex items-center px-3 py-3 mr-3 bg-blue-500 text-md text-white rounded-xl overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:bg-blue-600 transition-colors duration-100'>
                                <div>Chọn file (.csv)</div>
                                <input
                                    type="file"
                                    name='gradeFile'
                                    accept='.csv'
                                    // value={fileGrade}
                                    onChange={handleFileChange}
                                    className='hidden'
                                />

                            </label>

                            {/* Hiện tên file */}
                            <div className='flex flex-col justify-center w-[70%] h-[100%] p-2 text-center text-md bg-white border border-gray-500 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap'>
                                {fileGrade ? (
                                    <div className="text-md text-gray-700">{fileName}</div>
                                ) : (
                                    <div className="text-md text-gray-400">Upload file điểm</div>
                                )}
                            </div>
                        </div>
                        {error.gradeFile && (
                            <div className="text-red-500 text-sm ml-36">{error.gradeFile}</div>
                        )}
                    </div>

                    <div className='md:hidden flex flex-col items-center justify-center h-[13%]'>
                        <button
                            className='w-[200px] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'
                            type='submit'>
                            Cập nhật điểm
                        </button>

                    </div>

                    {popUp && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AddSuccess onClose={changeStatePopup}/>
                        </div>
                    )}

                </form>

            </div>

            {/* <footer className='h-[15vh] w-full bg-gray-500'>

            </footer> */}
            <Footer/>
        </div>

    );
};

export default GradeInput;

