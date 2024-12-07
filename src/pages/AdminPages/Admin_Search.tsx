import GradeSearch from "./Search";
import GradeTable from "./Table";
import Header from "../LoginPages/HeaderFooter/Header";
import Footer from "../LoginPages/HeaderFooter/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

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

interface CourseInfo {
  ID: string,
  MS: string,
  Credit: string,
  Name: string,
  Desc: string,
  HS: string[],
  CreatedBy: string,
  UpdatedBy: string,
}

interface ClassInfo {
  ID: string,
  Semester: string,
  Name: string,
  CourseId: string,
  ListStudentMs: string[],
  TeacherId: string,
  CreatedBy: string,
  UpdatedBy: string,
}

interface SearchedClass {
  classID: string,
  courseID: string,
  courseName: string,
  teacherName: string,
  numMember: number,
}

function AdminSearch() {

  const [classCode, setClassCode] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [semester, setSemester] = useState("");

  const [courseId, setCourseId] = useState<string>("");

  const [teacherList, setTeacherList] = useState<TeacherInfo[]>([]);
  const [studentList, setStudentList] = useState<StudentInfo[]>([]);
  const [courseList, setCourseList] = useState<CourseInfo[]>([]);
  const [classList, setClassList] = useState<ClassInfo[]>([]);
  const [searchedClass, setSearchedClass] = useState<SearchedClass>();

  const handleClassCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassCode(event.target.value); // Cập nhật giá trị từ input
    // console.log(classCode);
  };
  const handleCourseCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseCode(event.target.value); // Cập nhật giá trị từ input
    // console.log(courseCode);
  };
  const handleSemester = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value); // Cập nhật giá trị từ input
    // console.log(semester);
  };

  const handleSearchClass = async (event: React.FormEvent) => {
    event.preventDefault();

    const matchedCourse = courseList.find((course) => course.MS === courseCode);
    const matchedCourseId = matchedCourse?.ID || "";
    setCourseId(matchedCourseId);
    // console.log("Check point");
    await fetchClass(matchedCourseId);
    console.log("Check class list", classList);
    const matchedClass = classList.find((cls) => cls.Name === classCode && cls.Semester === semester);
    const matchedTeacher = teacherList.find((tcher) => tcher.ID === matchedClass?.TeacherId);
    
    console.log("Mát tích chờ:", matchedTeacher);
    console.log("Mát course:", matchedCourse);
    console.log("Mát cờ lát:", matchedClass);
    if (matchedCourse && matchedClass && matchedTeacher) {
      // Cập nhật searchedClass với các thông tin đã lấy được
      setSearchedClass({
        classID: matchedClass.ID,
        courseID: matchedCourse.ID,
        courseName: matchedCourse.Name,
        teacherName: matchedTeacher.Name,
        numMember: matchedClass.ListStudentMs.length,
      });

      console.log("Searched class updated:", {
        classID: matchedClass.ID,
        courseID: matchedCourse.ID,
        courseName: matchedCourse.Name,
        teacherName: matchedTeacher.Name,
        numMember: matchedClass.ListStudentMs.length,
      });
    } else {
      // alert("Vui lòng kiểm tra lại thông tin lớp cần tìm");
      console.log("No matching class or course or teacher found.");
      setSearchedClass(undefined); // Xóa thông tin nếu không tìm thấy kết quả
    }
  };

  const fetchClass = async (searchedCourseId: string) => {
    try {
      const token = localStorage.getItem("BearerToken");
      const classesList = await axios.get(
        `https://dacnpm.thaily.id.vn/admin/api/class/course/${searchedCourseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = classesList.data;
      console.log("Check data class:", data);

      // Duyệt qua danh sách lớp và lưu các thuộc tính cần thiết
      const formattedClasses = data.classes.map((ClassItem: any) => ({
        ID: ClassItem.ID,
        Semester: ClassItem.Semester,
        Name: ClassItem.Name,
        CourseId: ClassItem.CourseId,
        ListStudentMs: ClassItem.ListStudentMs,
        TeacherId: ClassItem.TeacherId,
        CreatedBy: ClassItem.CreatedBy,
        UpdatedBy: ClassItem.UpdatedBy
      }));

      setClassList(formattedClasses);
      console.log("Danh sách lớp học:", classList);
    }
    catch (error) {
      console.error("Failed to fetch class info:", error);
    }
  };

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

    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("BearerToken");
        console.log("Token của admin:", token);
        const courses = await axios.get(
          `https://dacnpm.thaily.id.vn/admin/api/course/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = courses.data;

        // Duyệt qua danh sách lớp và lưu các thuộc tính cần thiết
        const formattedCourses = data.allCourse.map((CourseItem: any) => ({
          ID: CourseItem.ID,
          MS: CourseItem.MS,
          Credit: CourseItem.Credit,
          Name: CourseItem.Name,
          Desc: CourseItem.Desc,
          HS: CourseItem.HS,
          CreatedBy: CourseItem.CreatedBy,
          ExpiredAt: CourseItem.ExpiredAt,
        }));

        setCourseList(formattedCourses);
      }
      catch (error) {
        console.error("Failed to fetch course info:", error);
      }
    };


    fetchTeacher();
    fetchStudent();
    fetchCourse();
  }, []);

  // Check thông tin GV và SV

  useEffect(() => {
    console.log("Teacher list updated:", teacherList);
  }, [teacherList]);

  useEffect(() => {
    console.log("Student list updated:", studentList);
  }, [studentList]);

  useEffect(() => {
    console.log("Course list updated:", courseList);
  }, [courseList]);

  useEffect(() => {
    console.log("Class list updated:", classList);
  }, [classList]);

  return (

    <div>
      <Header />
      <Navbar />
      <div className="flex flex-col flex-grow items-center ">
        <div className="text-5xl font-medium text-center w-full mt-5">Tìm kiếm lớp học</div>

        <form className="w-[60%]  mt-5 bg-gray-200 border-2 border-t-blue-600 flex flex-col"
          onSubmit={handleSearchClass}
        >

          <div className="border-2 border-black bg-blue-600 m-5 p-2 text-white text-center text-2xl font-medium w-[20%] h-15   ">
            Tìm kiếm
          </div>

          <div className="flex flex-row justify-evenly items-center mt-10  ">

            <div className="flex flex-col justify-center items-center h-[90px] w-[30%]">

              <h2 className="h-[40%] text-2xl text-blue-800 font-medium  ">Mã môn học</h2>
              <input type="text" placeholder="Nhập mã môn học" className="h-[60%] w-full rounded-xl border border-black text-center text-md  "
                onChange={handleCourseCode} />

            </div>

            <div className="flex flex-col justify-center items-center h-[90px] w-[30%]">

              <h2 className="h-[40%] text-2xl text-blue-800 font-medium  ">Mã lớp học</h2>
              <input type="text" placeholder="Nhập mã lớp học" className="h-[60%] w-full rounded-xl border border-black text-center text-md  "
                onChange={handleClassCode} />

            </div>

            <div className="flex flex-col justify-center items-center h-[90px] w-[30%]">

              <h2 className="h-[40%] text-2xl text-blue-800 font-medium  ">Học kỳ</h2>
              <input type="text" placeholder="Nhập học kỳ" className="h-[60%] w-full rounded-xl border border-black text-center text-md  "
                onChange={handleSemester} />

            </div>
          </div>

          <button className="bg-blue-500 h-[60px] w-[200px] text-white text-2xl rounded-xl font-medium self-center my-10 hover:bg-blue-600 duration-200  ">
            Tìm lớp học
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Mã Lớp</th>
                <th className="px-4 py-2 text-left">Mã Môn Học</th>
                <th className="px-4 py-2 text-left">Tên Môn Học</th>
                <th className="px-4 py-2 text-left">Giảng viên phụ trách</th>
                <th className="px-4 py-2 text-left">Số lượng thành viên</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">{searchedClass?.classID}</td>
                <td className="px-4 py-2">{searchedClass?.courseID}</td>
                <td className="px-4 py-2">{searchedClass?.courseName}</td>
                <td className="px-4 py-2">{searchedClass?.teacherName}</td>
                <td className="px-4 py-2">{searchedClass?.numMember}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default AdminSearch;
