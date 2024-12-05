import UserAvatar from "../../assets/img/bababananana.png"
import UserSign from "../../assets/img/user-sign.png"
function UserInfo() {
  return (
    <div className="w-1/2 mx-auto shadow-2xl rounded-2xl py-2 px-10">
      <div className="text-4xl font-bold text-center py-3">Thông tin người dùng</div>
      <div className="flex my-3 gap-10">
        <img src={UserAvatar} alt="avatar"></img>
        <div className="flex flex-col">
          <span>Họ và tên: Chúi Chúi</span>
          <span>Ngày sinh: 23/10/2024</span>
          <span>Mã số: 221xxxx</span>
          <span>Chức vụ</span>
          <span>Ngày bắt đầu làm</span>
        </div>
      </div>
      <div className="flex flex-col items-end mr-32">
        <div className="text-2xl font-bold text-center py-3 mr-10">Chữ ký</div>
        <img src={UserSign} alt="sign" className="w-[9.375rem]"></img>
      </div>
    </div>
  );
}

export default UserInfo;