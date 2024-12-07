import React, { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false); // State để điều khiển việc hiển thị popup

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null); // Lấy tệp từ input
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn ngừa reload trang

    // Kiểm tra xem người dùng đã chọn tệp hay chưa
    if (!file) {
      alert("Please select a file.");
    } else {
      // Giả sử bạn có thể thực hiện hành động submit ở đây (gửi dữ liệu, gọi API...)
      // Sau khi xử lý xong, bạn có thể hiển thị popup thông báo thành công
      setShowSuccess(true);
    }
  };

  const handleClosePopup = () => {
    setShowSuccess(false); // Đóng popup khi nhấn nút đóng
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          required
          onChange={handleFileChange} // Khi chọn tệp, cập nhật state file
          className="input-file"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Popup thông báo thành công */}
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[300px] text-center">
            <h3 className="text-green-600">File uploaded successfully!</h3>
            <button
              onClick={handleClosePopup} // Xử lý khi người dùng click vào nút "Close"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
