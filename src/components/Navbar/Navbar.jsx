import arrowdown from "../../assets/img/chevron-down.svg"
function Navbar() {
  return (
    <div className="bg-white h-14 w-full flex border-b text-xl font-bold items-center px-20 z-40">
      <div className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[52px]">Trang chủ</div>
      <div className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[52px]">Tra cứu điểm</div>
      <div className="px-10 cursor-pointer hover:bg-[#c3c3c3] h-full leading-[52px] flex items-center">
        Quản lý
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24"/>
          <path d="M17 9.5L12 14.5L7 9.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default Navbar;