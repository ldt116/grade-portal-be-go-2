import Button from "../Button/Button";
function GradeSearch() {
  return (
    <div className="bg-[#ECE8E8] border-t-4 border-[#0B4DC8] py-7 px-6">
      <Button text="Tra cứu điểm" />
      <div className="flex my-12 justify-between">
        <div className="border border-black bg-white rounded-3xl">
          <label htmlFor="mssv" className="border-r border-black py-[0.3125rem] px-4">MSSV</label>
          <input type="number" placeholder="Nhập MSSV" id="mssv" className="pl-4 py-1 rounded-e-3xl"></input>
        </div>
        <div className="border border-black bg-white rounded-3xl">
          <label htmlFor="mssv" className="border-r border-black py-[0.3125rem] px-4">Mã Môn Học</label>
          <input type="text" placeholder="Nhập Mã Môn Học" id="mssv" className="pl-4 py-1 rounded-e-3xl"></input>
        </div>
        <div className="border border-black bg-white rounded-3xl">
          <label htmlFor="hk" className="border-r border-black py-[0.3125rem] px-4">Học Kỳ</label>
          <select id="hk" className="px-4 py-1 rounded-e-3xl">
            <option disabled selected hidden>Chọn</option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default GradeSearch;