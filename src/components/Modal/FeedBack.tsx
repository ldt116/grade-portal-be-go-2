import React, { useState } from 'react';
import Respon from "../../assets/img/respon.png";
import Send from "../../assets/img/Send - Iconly Pro.svg";
import NotificationModal from "./Notification";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [showNotification, setShowNotification] = useState(false);

    // Hàm khi nhấn "Gửi"
    const handleSend = () => {
        setShowNotification(true); // Hiển thị NotificationModal
    };

    // Hàm khi nhấn "Đóng" trong NotificationModal
    const handleCloseNotification = () => {
        setShowNotification(false); // Đóng NotificationModal
        onClose(); // Đóng FeedbackModal
    };

    // Hàm khi nhấn "Gửi phản hồi khác"
    const handleSendAnotherFeedback = () => {
        setShowNotification(false); // Đóng NotificationModal
    };

    if (!isOpen && !showNotification) return null;

    return (
        <>
            {/* FeedbackModal */}
            {!showNotification && isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-[32rem] p-6 pt-4 rounded-lg border border-black">
                        <div className="flex justify-center items-center mb-4">
                            <h2 className="text-2xl font-bold">GỬI PHẢN HỒI <img src={Respon} alt="Feedback Icon" className="inline w-6 h-6 ml-2" /></h2>
                        </div>

                        {/* Đường kẻ ngang dưới tiêu đề kéo dài hết chiều ngang */}
                        <hr className="border-t border-black -mx-6 my-4" />

                        {/* Form nhập tiêu đề và nội dung */}
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                placeholder="Nhập tiêu đề vào đây"
                                className="w-full p-2 border border-black rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Nội dung</label>
                            <textarea
                                placeholder="Nhập nội dung vào đây"
                                className="w-full p-2 h-24 border border-black rounded-md resize-none"
                            />
                        </div>

                        {/* Nút Gửi và Thoát với đường phân cách dọc giữa chúng */}
                        <div className="relative flex border-t border-black -mx-6">
                            <button
                                className="flex-1 py-3 flex items-center justify-center font-semibold text-lg gap-2"
                                onClick={handleSend}
                            >
                                Gửi <img src={Send} alt="Send Icon" className="w-5 h-5" />
                            </button>

                            {/* Đường phân cách dọc giữa hai nút */}
                            <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-[0.25px] bg-black"></div>

                            <button
                                onClick={onClose}
                                className="flex-1 py-3 flex items-center justify-center font-semibold text-lg gap-2"
                            >
                                Thoát ✖️
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* NotificationModal */}
            {showNotification && (
                <NotificationModal
                    isOpen={showNotification}
                    onClose={handleCloseNotification}
                    onSendAnotherFeedback={handleSendAnotherFeedback}
                />
            )}
        </>
    );
};

export default FeedbackModal;
