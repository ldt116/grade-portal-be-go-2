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

function AdminSearch() {


  const [teacherList, setTeacherList] = useState<TeacherInfo[]>([]);
  const [studentList, setStudentList] = useState<StudentInfo[]>([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("login");
        console.log("Check token:", token)
        const teachers = await axios.get(
          `https://dacnpm.thaily.id.vn/api/account/teacher`,
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
        console.log("Danh sách gv:", teacherList);
      } catch (error) {
        console.error("Failed to fetch teacher info:", error);
      }
    };

    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("login");
        const students = await axios.get(
          `https://dacnpm.thaily.id.vn/api/account/student`,
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
        console.log("Danh sách sv:", studentList);
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      }
    }
    fetchTeacher();
    fetchStudent();
  }, []);
  return (

    <div>
      <Header />
      <Navbar />
      <div className="text-[5rem] py-4 px-20 text-center">Tìm kiếm lớp học</div>
      {/* Centering the GradeSearch */}
      <div className="flex justify-center w-full mt-7">
        <div className="w-2/3">
          <GradeSearch />
        </div>
      </div>
      <div className="w-full mt-7 mb-10">
        {/* Added margin-bottom (mb-10) for space between GradeTable and footer */}
        <GradeTable />
      </div>
      <footer className="w-full py-4 text-center">
        {/* Footer content goes here */}

      </footer>
      <Footer />
    </div>

  );
}

export default AdminSearch;
