import React, { useEffect, useState } from 'react';
import Button from "../Button/Button";
import { CLIENT_API_URL, ADMIN_API_URL } from '../../constants/api.js';

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

const TOKEN_KEY = 'login';

function GradeSearch() {
  const [classList, setClassList] = useState<ClassItem[]>([]);
  const [courseMap, setCourseMap] = useState<{ [key: string]: string }>({});
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClassAccountData = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error('Token không tồn tại trong localStorage.');

      const response = await fetch(`${CLIENT_API_URL}/class/account`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorMessage}`);
      }

      const data: ApiResponse = await response.json();
      if (data.code === 'success' && data.classAll.length > 0) {
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

  const fetchCourseNames = async (courseIds: string[]) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error('Token không tồn tại trong localStorage.');

      const courseNames: { [key: string]: string } = {};
      for (const courseId of courseIds) {
        const response = await fetch(`${ADMIN_API_URL}/course/${courseId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: CourseResponse = await response.json();
          if (data.status === 'success') {
            courseNames[courseId] = data.course.Name;
          } else {
            courseNames[courseId] = 'Không xác định';
          }
        } else {
          courseNames[courseId] = 'Không xác định';
        }
      }
      setCourseMap(courseNames);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin khóa học:', error);
    }
  };

  useEffect(() => {
    fetchClassAccountData();
  }, []);

  return (
    <div className="bg-[#ECE8E8] border-t-4 border-[#0B4DC8] py-7 px-6">
      <Button text="Tra cứu điểm" />
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
            onChange={(e) => setSelectedClass(e.target.value)}
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default GradeSearch;
