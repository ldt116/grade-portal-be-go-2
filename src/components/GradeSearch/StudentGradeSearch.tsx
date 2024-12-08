import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "../Button/Button";
import { CLIENT_API_URL, ADMIN_API_URL } from '../../constants/api.js';
import {useNavigate} from 'react-router-dom'
import StudentGradeTable from '../GradeTable/StudentGradeTable'

// Định nghĩa kiểu dữ liệu cho lớp học
interface ClassItem {
  ID: string;
  Name: string;
  Semester: string;
  CourseId: string;
  TeacherId: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi từ API lớp học
interface ApiResponse {
  classAll: ClassItem[];
  code: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi từ API khóa học
interface CourseResponse {
  course: {
    ID: string;
    MS: string;
    Credit: number;
    Name: string;
    Desc: string;
    HS: number[];
    CreatedBy: string;
    UpdatedBy: string;
  };
  message: string;
  status: string;
}

const TOKEN_KEY = 'BearerToken';
const CLASS_ID_KEY = 'SelectedClassID'; // Khóa để lưu ID lớp học

function StudentGradeSearch() {
  const navigate = useNavigate();
  const [classList, setClassList] = useState<ClassItem[]>([]);
  const [courseMap, setCourseMap] = useState<{ [key: string]: string }>({});
  const [selectedClass, setSelectedClass] = useState<string>(sessionStorage.getItem(CLASS_ID_KEY) || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClassAccountData = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error('Token không tồn tại trong localStorage.');

      const response = await axios.get<ApiResponse>(`${CLIENT_API_URL}/class/account`, {
        headers: {
          'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',

        },
      });

      const data = response.data;
      if (data.code === 'success' && data.classAll.length > 0) {
         console.log(data);
        setClassList(data.classAll);
        fetchCourseNames(data.classAll.map((item) => item.CourseId));
      } else {
        setClassList([]);
        throw new Error('Không tìm thấy lớp học nào.');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
const handleNavigate = () => {
    //window.location.reload();
  };

  const fetchCourseNames = async (courseIds: string[]) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error('Token không tồn tại trong localStorage.');

      const courseNames = await Promise.all(
        courseIds.map(async (courseId) => {
          try {
            const response = await axios.get<CourseResponse>(`${ADMIN_API_URL}/course/${courseId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });

            return { [courseId]: response.data.status === 'success' ? response.data.course.Name : 'Không xác định' };
          } catch {
            return { [courseId]: 'Không xác định' };
          }
        })
      );

      setCourseMap(Object.assign({}, ...courseNames));
    } catch (error) {
      console.error('Lỗi khi lấy thông tin khóa học:', error);
    }
  };

  useEffect(() => {
    fetchClassAccountData();
  }, []);

const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const classId = e.target.value;
  console.log(classId);
  
  if (classId && classId !== selectedClass) {
    setSelectedClass(classId);
    sessionStorage.setItem(CLASS_ID_KEY, classId);
  }
    //window.location.reload();
};


  return (
    <div className="bg-[#ECE8E8] border-t-4 border-[#0B4DC8] py-7 px-6">
      <div className="flex my-12 justify-between">
        <div className="border border-black bg-white rounded-3xl">
          <label htmlFor="mssv" className="border-r border-black py-[0.3125rem] px-4">
            MSSV
          </label>
          <input
            type="number"
            placeholder="Nhập MSSV"
            id="mssv"
            className="pl-4 py-1 rounded-e-3xl"
          />
        </div>
        <div className="border border-black bg-white rounded-3xl">
          <label htmlFor="classSelect" className="border-r border-black py-[0.5rem] px-4">
            Lớp Học
          </label>
          <select
            id="classSelect"
            className="pl-4 py-1 rounded-e-3xl"
            value={selectedClass}
            onChange={handleClassChange}
            disabled={loading}
          >
            <option value="">Chọn lớp học</option>
            {loading ? (
              <option disabled>Đang tải...</option>
            ) : classList.length > 0 ? (
              classList.map((classItem) => (
                <option key={classItem.ID} value={classItem.ID}>
                  {`${classItem.Name} - ${courseMap[classItem.CourseId] || 'Đang tải...'} - ${classItem.Semester}`}
                </option>
              ))
            ) : (
              <option disabled>Không có lớp học</option>
            )}
          </select>
        </div>
      </div>
      <div className="w-full mt-7">
        <StudentGradeTable />
      </div>
    </div>

  );
}

export default StudentGradeSearch;
