import React, { useState, useEffect } from "react";
import axios from "axios";
import useProtectedRoute from '../../components/useProtectedRoute'; // Đường dẫn tới hook vừa tạo
const ClassCreate: React.FC = () => {
    useProtectedRoute('/class/create'); // Kiểm tra nếu người dùng có quyền truy cập
  const [teachers, setTeachers] = useState<{ ID: string; Ms: string; Name: string }[]>([]);
  const [courses, setCourses] = useState<{ ID: string; MS: string; Name: string }[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    semester: "",
    name: "",
    course_id: "",
    teacher_id: "",
    listStudent_ms: [] as string[],
  });

  // Fetch Teachers, Courses, and Semesters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("BearerToken");
        if (!token) {
          alert("Token not found. Please log in.");
          return;
        }

        // Fetch Teachers
        const teacherResponse = await axios.get(
          "https://dacnpm.thaily.id.vn/admin/api/account/teacher",
          {
            headers: {
              Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',

            },
          }
        );

        if (teacherResponse.data && teacherResponse.data.foundedUser) {
          const teacherList = teacherResponse.data.foundedUser.map((teacher: any) => ({
            ID: teacher.ID,
            Ms: teacher.Ms,
            Name: teacher.Name,
          }));
          setTeachers(teacherList);
        }

        // Fetch Courses and Semesters
        const courseResponse = await axios.get("https://dacnpm.thaily.id.vn/admin/api/course/all", {
          headers: {
            Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',

          },
        });

        if (courseResponse.data && courseResponse.data.allCourse) {
          const courseList = courseResponse.data.allCourse.map((course: any) => ({
            ID: course.ID,
            MS: course.MS,
            Name: course.Name,
          }));
          setCourses(courseList);
        }

        if (courseResponse.data && courseResponse.data.semester) {
          const { PREV, CUREENT, NEXT } = courseResponse.data.semester;
          setSemesters([PREV, CUREENT, NEXT]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch teacher, course, or semester data.");
      }
    };

    fetchData();
  }, []);

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target?.result as string;

    // Split the CSV by lines
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

    // Remove the header row (assuming 'mssv' is the header)
    const studentIDs = lines.slice(1).map((line) => line.split(",")[0]); // Assumes CSV uses commas

    setFormData((prev) => ({ ...prev, listStudent_ms: studentIDs }));
  };
  reader.readAsText(file);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("BearerToken");
  if (!token) {
    alert("Token not found. Please log in.");
    return;
  }

  try {
    const response = await axios.post(
      "https://dacnpm.thaily.id.vn/admin/api/class/create",
      formData, // The formData state already contains the required structure
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      alert("Class created successfully!");
    } else {
      alert(`Error: ${response.data.message || "Failed to create class"}`);
    }
  } catch (error: any) {
    console.error("Error submitting form:", error);
    alert(error.response?.data?.message || "An unexpected error occurred");
  }
};      

  return (
    <div className="mt-40 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col items-center max-w-4xl mt-5 mb-5 rounded-lg border border-black p-4 bg-white">
        <h1 className="text-2xl font-bold mb-4">Tạo Một Lớp Học Mới</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Semester Dropdown */}
          <label>
            Học Kỳ:
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="block w-full border rounded p-2"
              required
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </label>

       
          {/* Teacher Dropdown */}
          <label>
            Giảng Viên:
            <select
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
              className="block w-full border rounded p-2"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.ID} value={teacher.ID}>
                  {teacher.Ms} - {teacher.Name}
                </option>
              ))}
            </select>
          </label>

          {/* Course Dropdown */}
          <label>
            Khóa Học:
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="block w-full border rounded p-2"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.ID} value={course.ID}>
                  {course.MS} - {course.Name}
                </option>
              ))}
            </select>
          </label>

          {/* Class Name Input */}
          <label>
            Tên Lớp:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full border rounded p-2"
              placeholder="Enter class name"
              required
            />
          </label>

          {/* CSV File Upload */}
          <label>
            Upload Student List (CSV):
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full border rounded p-2"
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            TẠO LỚP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassCreate;
