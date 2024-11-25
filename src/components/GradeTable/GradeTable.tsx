import { useParams } from 'react-router-dom';
import { fetchGradeByIdApi } from '../../apis/classInfo.api';
import { useState, useEffect,  } from 'react';

function GradeTable() {
    const { id } = useParams();
    console.log(id);
    const [gradeInfo, setGradeInfo] = useState(null); // Initialize state to store course data
    useEffect(() => {
        fetchGradeByIdApi(id)
            .then((scoreInfo) => {
                setGradeInfo(scoreInfo); // Update state once data is fetched
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [id]);

    if (!gradeInfo) {
        return <div></div>;
    }
  return (

    
    <div>
      <table className="bg-[#ECE8E8] w-full">
        <tr className="bg-[#0388B4]">
          <th>MSSV</th>
          <th className="border-x border-white">Tên Sinh Viên</th>
          <th className="border-x border-white">Tên Môn Học</th>
          <th className="border-x border-white">Điểm Thành Phần</th>
          <th className="border-x border-white">Điểm Tổng Kết</th>
          <th>Ngày Cập Nhật</th>
        </tr>
        <tr>
          <td className="pl-4">2213857</td>
          <td className="pl-4">Võ Ngọc Tú</td>
          <td className="pl-4">Hệ cơ sở dữ liệu</td>
          <td className="pl-4">10 10 10</td>
          <td className="pl-4">10</td>
          <td className="pl-4">11/08/2024</td>
        </tr>
      </table>
    </div>
  )
}

export default GradeTable