import React, { useEffect, useState } from "react";
import axios from "axios";

// Define types for the data structure
interface StudentData {
  mssv: string;
  dtb: number;
}

interface CourseData {
  course_id: string;
  data: StudentData[];
}

interface HallOfFameData {
  semester: string;
  tier: CourseData[];
}

const HallOfFame: React.FC = () => {
  const [data, setData] = useState<HallOfFameData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [courseNames, setCourseNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("BearerToken");

      if (!token) {
        setError("Authorization token not found!");
        return;
      }

      try {
        // Fetch Hall of Fame data
        const response = await axios.get(process.env.REACT_APP_CLIENT_HOF!, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data;

        if (response.status === 200 && result.status === "success") {
          setData(result.data);
          fetchCourseNames(result.data.tier.map((course: CourseData) => course.course_id));
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    // Fetch course names for a list of course IDs
    const fetchCourseNames = async (courseIds: string[]) => {
      const token = localStorage.getItem("BearerToken");
      if (!token) return;

      try {
        const names: { [key: string]: string } = {};

        await Promise.all(
          courseIds.map(async (course_id) => {
            try {
              const res = await axios.get(`${process.env.REACT_APP_CLIENT_GET_COURSE}/${course_id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });

              if (res.data.status === "success") {
                names[course_id] = res.data.course.Name;
              }
            } catch (err) {
              console.error(`Failed to fetch course name for ${course_id}`, err);
            }
          })
        );

        setCourseNames(names);
      } catch (err) {
        console.error("Error fetching course names", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#00539C] text-[#FFB58F] text-[2rem] font-bold text-center">
        Bảng Vinh Danh
      </div>


      {data ? (
        <div>
          <div className="text-center font-bold mb-2">
            Semester: {data.semester}
          </div>

          {data.tier.map((course, index) => (
            <div key={index} className="mb-6">
              <div className="font-bold text-lg mb-2 text-center">
                {courseNames[course.course_id]
                  ? `Course: ${courseNames[course.course_id]}`
                  : `Course ID: ${course.course_id}`}
              </div>
              <table className="bg-[#ECE8E8] w-full">
                <thead>
                  <tr>
                    <th className="bg-[#D9D9D9]">MSSV</th>
                    <th className="bg-[#D9D9D9]">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {course.data.map((student, idx) => (
                    <tr key={idx}>
                      <td className="text-center">{student.mssv}</td>
                      <td className="text-center">{student.dtb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        !error && <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default HallOfFame;
