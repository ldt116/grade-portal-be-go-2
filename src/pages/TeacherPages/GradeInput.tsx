import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import AddSuccess from '../../components/PopUp/AddSuccess';
<<<<<<< HEAD
import Header from '../../components/HeaderFooter/Header';
import Footer from '../../components/HeaderFooter/Footer';
import axios from 'axios';
import Papa from 'papaparse';
=======
import axios from 'axios';
import Papa from 'papaparse';
import useProtectedRoute from '../../components/useProtectedRoute'; // Đường dẫn tới hook vừa tạo
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab

interface ClassInfo {
    ID: string,
    Semester: string,
    Name: string,
    CourseId: string,
    ListStudentMs: string[],
    TeacherId: string,
    CreatedBy: string,
    UpdatedBy: string
}

interface ScoreData {
    mssv: string;
    data: {
        BT: number[];
        TN: number[];
        BTL: number[];
        GK: number;
        CK: number;
    };
}

const GradeInput: React.FC = () => {
<<<<<<< HEAD
=======
    useProtectedRoute('/teacher/gradeinput')
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab

    const [classInfo, setClassInfo] = useState<ClassInfo[]>([]);

    const [scores, setScores] = useState<ScoreData[]>([]);

    const [popUp, setPopUp] = useState(false);
<<<<<<< HEAD
=======
    const [courseNames, setCourseNames] = useState<{ [key: string]: string }>({});
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab

    const changeStatePopup = () => {
        setPopUp(!popUp);
    }

    const [error, setError] = useState<{ [key: string]: string }>({});

    const [selectedClass, setSelectedClass] = useState<ClassInfo>();


    const handleSelectChange = (classid: string) => {
        // Tìm lớp học trong classInfo dựa trên classID
        const findClass = classInfo.find((classItem) => classItem.ID === classid);

        if (findClass) {
            console.log("Lớp học được chọn:", findClass.Name);
            setSelectedClass(findClass);

        }
        else {
            console.log("Không tìm thấy lớp học với classID:", classid);
        }
    };

    const [fileGrade, setFileGrade] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Lưu tên file
            setFileGrade(file);
            setError({ ...error, gradeFile: '' });
            Papa.parse(file, {
                header: true, // Đọc CSV với dòng đầu là header
                skipEmptyLines: true, // Bỏ qua dòng trống
                complete: (result) => {
                    // Tạo dữ liệu từ file CSV
                    const formattedScores: ScoreData[] = result.data.map((row: any) => ({
                        mssv: row.mssv,
                        data: {
                            BT: [parseFloat(row.BT1), parseFloat(row.BT2), parseFloat(row.BT3)],
                            TN: [parseFloat(row.TN)],
                            BTL: [parseFloat(row.BTL)],
                            GK: parseFloat(row.GK),
                            CK: parseFloat(row.CK),
                        },
                    }));

                    // Gán vào state
                    setScores(formattedScores);
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error);
                },
            });
        }
        else {
            setFileName('');
            setFileGrade(null);
        }
    };

    const validateForm = () => {
        let newError: { [key: string]: string } = {};
        let valid = true;

        // Kiểm tra file

        if (!fileGrade) {
            newError.gradeFile = 'Hãy upload file điểm!';
            valid = false;
        }

        setError(newError);
        return valid;
    }

    const fetchClassInfo = async () => {
        try {
<<<<<<< HEAD
            const token = localStorage.getItem("login");
=======
            const token = localStorage.getItem("BearerToken");
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
            const classIdExists = await axios.get(
                `https://dacnpm.thaily.id.vn/api/class/account`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = classIdExists.data;

            // Duyệt qua danh sách lớp và lưu các thuộc tính cần thiết
            const formattedClasses = data.classAll.map((classItem: any) => ({
                ID: classItem.ID || "", // Lấy classID hoặc giá trị mặc định
                Semester: classItem.Semester || "",
                Name: classItem.Name || "",
                CourseId: classItem.CourseId || "",
                ListStudentMs: classItem.ListStudentMs || [],
                TeacherId: classItem.TeacherId || "",
                CreatedBy: classItem.CreatedBy || "",
                UpdatedBy: classItem.UpdatedBy || "",
            }));


            // Cập nhật state với danh sách lớp đã format
            setClassInfo(formattedClasses);
<<<<<<< HEAD
=======

            const courses = await Promise.all(
                formattedClasses.map(async (classItem: any) => {
                    if (classItem.CourseId) {
                        const courseResponse = await axios.get(
                            `https://dacnpm.thaily.id.vn/api/course/${classItem.CourseId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log(courseResponse.data.course.Name);
                        return { courseId: classItem.CourseId, courseName: courseResponse.data.course.Name };
                    }
                    return null;
                })
            );

            const courseNameMap = courses.reduce((acc: { [key: string]: string }, course: any) => {
                if (course) acc[course.courseId] = course.courseName;
                return acc;
            }, {});

            setCourseNames(courseNameMap);
            
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
        } catch (error) {
            console.error("Failed to fetch class info:", error);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            try {
<<<<<<< HEAD
                const token = localStorage.getItem("login");

                console.log("Check var:", selectedClass?.ID)

=======
                const token = localStorage.getItem("BearerToken");

                console.log("Check var:", selectedClass?.ID)

                

>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                const gradeInfo = {
                    semester: selectedClass?.Semester,
                    course_id: selectedClass?.CourseId,
                    class_id: selectedClass?.ID,
                    // class_id: '672b87af226ae67ef9aaa047',

                    score: scores.map((student) => ({
                        mssv: student.mssv,
                        data: {
                            BT: student.data.BT,
                            TN: student.data.TN,
                            BTL: student.data.BTL,
                            GK: student.data.GK,
                            CK: student.data.CK,
                        }
                    })),
                    expiredAt: "2024-12-31T23:59:59Z", // Hạn chót, lấy từ form hoặc cố định
                    createdBy: selectedClass?.CreatedBy,
                    updatedBy: selectedClass?.UpdatedBy
                }
<<<<<<< HEAD

=======
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                const checkExistedScore = await axios.get(
                    `https://dacnpm.thaily.id.vn/api/resultScore/${selectedClass?.ID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

<<<<<<< HEAD
                if (checkExistedScore.data.resultScore.SCORE) {
=======
                if (checkExistedScore.data.code==='success') {
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                    const modifyScore = await axios.patch(
                        `https://dacnpm.thaily.id.vn/api/resultScore/${selectedClass?.ID}`,
                        gradeInfo,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },

                        }
                    );
                    console.log("Đã cập nhật bằng PATCH", gradeInfo);
                }
<<<<<<< HEAD
                else {
                    const addScore = await axios.post(
                        `https://dacnpm.thaily.id.vn/api/resultScore/create`,
=======

            }
            catch (error) {
                const gradeInfo = {
                    semester: selectedClass?.Semester,
                    course_id: selectedClass?.CourseId,
                    class_id: selectedClass?.ID,
                    // class_id: '672b87af226ae67ef9aaa047',

                    score: scores.map((student) => ({
                        mssv: student.mssv,
                        data: {
                            BT: student.data.BT,
                            TN: student.data.TN,
                            BTL: student.data.BTL,
                            GK: student.data.GK,
                            CK: student.data.CK,
                        }
                    })),
                    expiredAt: "2024-12-31T23:59:59Z", // Hạn chót, lấy từ form hoặc cố định
                    createdBy: selectedClass?.CreatedBy,
                    updatedBy: selectedClass?.UpdatedBy
                }
                const token = localStorage.getItem("BearerToken");

                const addScore = await axios.post(
                        `https://dacnpm.thaily.id.vn/api/resultScore/create`,
                        {
                            score: [],
                            class_id: `${selectedClass?.ID}`,
                         },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },

                        }
                    );
                    const modifyScore = await axios.patch(
                        `https://dacnpm.thaily.id.vn/api/resultScore/${selectedClass?.ID}`,
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                        gradeInfo,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },

                        }
                    );
                    console.log("Đã thêm điểm bằng POST");
<<<<<<< HEAD
                }

            }
            catch (error) {
                console.error("Đã có lỗi khi gửi dữ liệu: ", error);
=======
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
            }
        } else {
            console.log("Form không hợp lệ");
        }
    };

    useEffect(() => {
        fetchClassInfo();
    }, []);




    return (
<div className="mt-40">
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>

            <Header />
            <Navbar />
            {/* Nhập điểm */}
            <div className='w-full flex flex-col items-center max-w-6xl my-5 rounded-lg h-[70vh] border border-black'>

                <h2 className='text-5xl my-5'>Nhập điểm</h2>

                <form
                    onSubmit={handleSubmit}
                    className='h-[90%] w-[80%] border bg-gray-200 border-t-4 border-t-blue-500'
                >
<<<<<<< HEAD
                    <div className='flex flex-row justify-center items-center w-[150px] h-[7vh] bg-blue-500 rounded-xl mt-4 ml-4 mb-10 text-white text-xl overflow-hidden whitespace-nowrap text-ellipsis '>Cập nhật điểm</div>
=======
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab

                    {/* Màn hình lớn */}
                    <div className='hidden md:flex flex-row justify-center m-5 h-[25%]'>

                        {/* Thông tin lớp */}
                        <div className='flex flex-col justify-evenly items-center h-[80%] w-[40%]'>
                            <div className='text-3xl font-medium '>
                                Chọn lớp
                            </div>

                            <select

                                id="classDropdown"
                                onChange={(event) => handleSelectChange(event.target.value)}
                                // onClick={fetchClassInfo}
                                className='bg-white rounded-2xl h-[50px] w-full text-center border border-gray-400 mt-5'
                            >
<<<<<<< HEAD

=======
                                <option value="">Chọn lớp học</option>
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                                {classInfo.map((classItem) => (
                                    <option
                                        key={classItem.ID}
                                        value={classItem.ID}
                                    >
<<<<<<< HEAD
                                        {classItem.CourseId} - {classItem.Name} - {classItem.Semester}
=======
                                        {courseNames[classItem.CourseId]} - {classItem.Name} - {classItem.Semester}
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='hidden md:flex flex-col items-center h-[25%] w-full'>
                        {/* Chọn file */}
                        <div className='flex flex-row justify-center items-center w-[80%] h-[50%]'>
                            <label className='flex items-center px-3 py-3 mr-3 bg-blue-500 text-md text-white rounded-xl overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer hover:bg-blue-600 transition-colors duration-100'>
                                <div>Chọn file (.csv)</div>
                                <input
                                    type="file"
<<<<<<< HEAD
=======

>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
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
                    <div className='md:hidden flex flex-row justify-center m-5 h-[25%]'>
                        {/* Thông tin lớp */}
                        <div className='flex flex-col items-center h-[65%] w-[35%]'>
                            
                            <div className='text-3xl font-medium '>
                                Chọn lớp
                            </div>
                            
                            <select
                                id="classDropdown"
                                onChange={(event) => handleSelectChange(event.target.value)}
                                onClick={fetchClassInfo}
                                className='bg-white rounded-2xl h-[50px] w-full text-center border border-gray-400 mt-5'
                            >

                                {classInfo.map((classItem) => (
                                    <option
                                        className='w-full'
                                        key={classItem.ID}
                                        value={classItem.ID}
                                    >
<<<<<<< HEAD
                                        {classItem.CourseId} - {classItem.Name} - {classItem.Semester}
=======
                                        {classItem.Name} - {classItem.Name} - {classItem.Semester}
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='md:hidden flex flex-col items-center h-[25%] w-full'>
                        {/* Chọn file */}
                        <div className='flex items-center justify-center w-[80%] h-[50%]'>
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

                    <div className='md:hidden flex flex-col items-center justify-center h-14 mt-2'>
                        <button
                            className='w-[200px] h-[100%] bg-[#0388B4] rounded-full text-white text-2xl'
                            type='submit'>
                            Cập nhật điểm
                        </button>

                    </div>

                    {popUp && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AddSuccess onClose={changeStatePopup} />
                        </div>
                    )}

                </form>

            </div>

<<<<<<< HEAD
            {/* <footer className='h-[15vh] w-full bg-gray-500'>

            </footer> */}
            <Footer />
=======
>>>>>>> 21ac512e3764d66cc6593bacaafa6400cb6321ab
        </div>
</div>
    );
};

export default GradeInput;
