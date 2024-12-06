import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define types for the API response
interface GradeData {
  MSSV: string;
  Data: {
    BT: number | null;
    TN: number | null;
    BTL: number | null;
    GK: number;
    CK: number;
  };
}

interface ApiResponse {
  code: string;
  score: GradeData;
}

function TeacherGradeTable() {
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const token = localStorage.getItem('BearerToken');
  const classID = sessionStorage.getItem('SelectedClassID');
  console.log(classID);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get<ApiResponse>(
          `https://dacnpm.thaily.id.vn/api/resultScore/${classID}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);
        if (data.code !== 'success') {
          throw new Error('Failed to fetch grade data');
          
        }

        setGradeData(data.score);
      } catch (err: any) {
        setError(err.message);
        setGradeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [classID]);
   

  const MSSV = gradeData?.MSSV ?? 'N/A';
  const Data = gradeData?.Data;

  return (
    <div>
      <table className="bg-[#ECE8E8] w-full">
        <thead>
          <tr className="bg-[#0388B4]">
            <th>MSSV</th>
            <th className="border-x border-white">Điểm Bài Tập</th>
            <th className="border-x border-white">Điểm Thực Nghiệm</th>
            <th className="border-x border-white">Điểm Bài Tập Lớn</th>
            <th className="border-x border-white">Điểm Giữa Kỳ</th>
            <th className="border-x border-white">Điểm Cuối Kỳ</th>
          </tr>
        </thead>
        <tbody>
          {Data ? (
            <tr>
              <td className="pl-4">{MSSV}</td>
              <td className="pl-4">{`${Data.BT}` ?? 'N/A'}</td>
              <td className="pl-4">{Data.TN ?? 'N/A'}</td>
              <td className="pl-4">{Data.BTL ?? 'N/A'}</td>
              <td className="pl-4">{Data.GK}</td>
              <td className="pl-4">{Data.CK}</td>
            </tr>
          ) : (
            <tr>
              
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherGradeTable    ;
