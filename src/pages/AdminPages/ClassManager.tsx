import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import useProtectedRoute from '../../components/useProtectedRoute'; // Đường dẫn tới hook vừa tạo
interface ClassData {
  //  useProtectedRoute('/class/:id'); // Kiểm tra nếu người dùng có quyền truy cập
  ID: string;
  Semester: string;
  Name: string;
  CourseId: string;
  ListStudentMs: string[];
  TeacherId: string;
  CreatedBy: string;
  UpdatedBy: string;
}

const ClassManager: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // State to track expanded student list
  const [csvData, setCsvData] = useState<string[]>([]); // State to store parsed MSSV
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      const token = localStorage.getItem("BearerToken");

      if (!token) {
        setError("Authentication token is missing. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`https://dacnpm.thaily.id.vn/admin/api/class/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          const classInfo: ClassData = response.data.class;
          setClassData(classInfo);

          // Fetch course name using CourseId
          const courseResponse = await axios.get(
            `https://dacnpm.thaily.id.vn/admin/api/course/${classInfo.CourseId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (courseResponse.data.status === "success") {
            setCourseName(courseResponse.data.course.Name);
          }

          // Fetch teacher name using TeacherId
          const teacherResponse = await axios.get(
            `https://dacnpm.thaily.id.vn/admin/api/account/${classInfo.TeacherId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (teacherResponse.data.status === "User found successfully") {
            setTeacherName(teacherResponse.data.account.Name);
          }
        }
      } catch (err) {
        setError("An error occurred while fetching class data.");
      }
    };

    fetchClassData();
  }, [id]);

  const handleDeleteClass = async () => {
    if (!classData) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class? This action cannot be undone."
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("BearerToken");

    if (!token) {
      setError("Authentication token is missing. Please log in.");
      return;
    }

    try {
      const response = await axios.delete(
        `https://dacnpm.thaily.id.vn/admin/api/class/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === "success") {
        alert("Class deleted successfully!");
        navigate(`/course/${classData.CourseId}`); // Điều hướng về trang chi tiết khóa học
      } else {
        setError(response.data.message || "Failed to delete class.");
      }
    } catch (err) {
      setError("An error occurred while deleting the class.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const parsedData = result.data
          .filter((row: any) => row.mssv) // Chỉ lấy hàng có mssv
          .map((row: any) => row.mssv.trim()); // Lấy dữ liệu cột `mssv` và loại bỏ khoảng trắng
        setCsvData(parsedData);
      },
      error: () => {
        setError("Failed to parse the CSV file.");
      },
    });
  };
const handleAddStudents = async () => {
  if (!classData || csvData.length === 0) {
    setError("No data to add. Please upload a valid CSV file.");
    return;
  }

  const token = localStorage.getItem("BearerToken");
  if (!token) {
    setError("Authentication token is missing. Please log in.");
    return;
  }
    console.log(csvData);
  try {
    const response = await axios.patch(
      `https://dacnpm.thaily.id.vn/admin/api/class/add`,
      {
        class_id: classData.ID,
        listStudent_ms: csvData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.code === "success") {
      alert("Students added successfully!");
      setCsvData([]); // Reset CSV data
      window.location.reload(); // Reload the page
    } else {
      setError(response.data.message || "Failed to add students.");
    }
  } catch (err) {
    console.error(err);
    setError("An error occurred while adding students.");
  }
};

  return (
    <div className="mt-40 flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full flex flex-col items-center max-w-4xl mt-5 mb-5 rounded-lg border border-black p-4 bg-white">
        {classData ? (
          <>
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-bold">Class Details</h1>
              <button
                onClick={handleDeleteClass}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete Class
              </button>
            </div>
            <p><strong>Semester:</strong> {classData.Semester}</p>
            <p><strong>Name:</strong> {classData.Name}</p>
            <p><strong>Course:</strong> {courseName || "Loading course name..."}</p>
            <p><strong>Teacher:</strong> {teacherName || "Loading teacher name..."}</p>

            <h2 className="text-xl font-semibold mt-4">Student List</h2>
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-blue-500 mt-2 mb-4"
            >
              {isExpanded ? "Collapse" : "Expand"} Student List
            </button>
            {isExpanded && classData.ListStudentMs && classData.ListStudentMs.length > 0 ? (
              <div className="grid grid-cols-5 gap-4 mt-2">
                {classData.ListStudentMs.map((studentId) => (
                  <div
                    key={studentId}
                    className="border rounded p-2 text-center bg-gray-50"
                  >
                    {studentId}
                  </div>
                ))}
              </div>
            ) : isExpanded ? (
              <p>No students available.</p>
            ) : null}

            <h2 className="text-xl font-semibold mt-4">Add Students</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="border border-gray-300 rounded p-2 mt-2"
            />
            <button
              onClick={handleAddStudents}
              className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600"
            >
              Add Students
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ClassManager;
