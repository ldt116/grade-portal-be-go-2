function HallOfFame() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#00539C] text-[#FFB58F] text-[2rem] font-bold text-center">Bảng Vinh Danh</div>
      <table className="bg-[#ECE8E8] w-full">
        <tr>
          <th className="bg-[#D9D9D9]">MSSV</th>
          <th className="bg-[#D9D9D9] border-x border-white">Họ Tên</th>
          <th className="bg-[#D9D9D9]">Điểm</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default HallOfFame