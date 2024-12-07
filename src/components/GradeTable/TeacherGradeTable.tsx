import { useState, useEffect } from 'react';
import axios from 'axios';

interface ScoreItem {
  MSSV: string;
  Data: {
    BT: number[];
    TN: number[];
    BTL: number[];
    GK: number;
    CK: number;
  };
}

interface ResultScore {
  ID: string;
  Semester: string;
  SCORE: ScoreItem[];
  ClassID: string;
  CourseID: string;
  ExpiredAt: string;
  CreatedBy: string;
  UpdatedBy: string;
}

interface ApiResponse {
  code: string;
  resultScore: ResultScore;
}

function StudentGradeTable() {
  const [scoreList, setScoreList] = useState<ScoreItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('BearerToken');
  const classID = sessionStorage.getItem('SelectedClassID');
useEffect(() => {
  const fetchGrades = async () => {
    try {
      if (!token) {
        throw new Error('Token not found');
      }

      if (!classID) {
        throw new Error('Class ID not found');
      }

      const response = await axios.get<ApiResponse>(
        `https://dacnpm.thaily.id.vn/api/resultScore/${classID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.code !== 'success') {
        throw new Error('Failed to fetch grade data');
      }

      const mssvFilter = sessionStorage.getItem('MSSV'); // Lấy giá trị mới nhất của MSSV
      const filteredScores = mssvFilter
        ? data.resultScore.SCORE.filter((item) => item.MSSV === mssvFilter)
        : data.resultScore.SCORE;

      setScoreList(filteredScores);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setScoreList(null);
    } finally {
      setLoading(false);
    }
  };

  fetchGrades();
}, [classID, token, sessionStorage.getItem('MSSV')]);


  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="bg-[#ECE8E8] w-full table-auto">
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
            {scoreList && scoreList.length > 0 ? (
              scoreList.map((SCORE, index) => (
                <tr key={index}>
                  <td className="pl-4">{SCORE.MSSV}</td>
                  <td className="pl-4">
                    {SCORE.Data.BT.length > 0 ? SCORE.Data.BT.join(', ') : 'N/A'}
                  </td>
                  <td className="pl-4">
                    {SCORE.Data.TN.length > 0 ? SCORE.Data.TN.join(', ') : 'N/A'}
                  </td>
                  <td className="pl-4">
                    {SCORE.Data.BTL.length > 0 ? SCORE.Data.BTL.join(', ') : 'N/A'}
                  </td>
                  <td className="pl-4">{SCORE.Data.GK}</td>
                  <td className="pl-4">{SCORE.Data.CK}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No grade data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentGradeTable;
