import React from 'react';

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSendAnotherFeedback: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, onSendAnotherFeedback }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[32rem] p-6 rounded-lg border border-black">
                <h2 className="text-2xl font-bold text-center mb-4">THÔNG BÁO</h2>
                <hr className="border-t border-black -mx-6 my-4" />
                <p className="text-center mb-6">
                    Phản hồi của bạn đã được gửi đến giảng viên.<br />
                    Vui lòng chờ để giảng viên hồi đáp.
                </p>
                <div className="relative flex border-t border-black -mx-6">
                    <button
                        onClick={onSendAnotherFeedback}
                        className="flex-1 py-3 flex items-center justify-center font-semibold text-lg"
                    >
                        Gửi phản hồi khác
                    </button>

                    {/* Đường phân cách */}
                    <div className="absolute inset-y-0 left-1/2 w-px bg-black"></div>

                    <button
                        onClick={onClose}
                        className="flex-1 py-3 flex items-center justify-center font-semibold text-lg"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
