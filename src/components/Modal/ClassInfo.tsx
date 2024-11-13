import React from 'react';
import ClassImg1 from '../../assets/img/class-img1.png';
import ClassImg2 from '../../assets/img/class-img2.png';
import ClassImg3 from '../../assets/img/class-img3.png';

interface ClassInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ClassInfoModal: React.FC<ClassInfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 px-6 pt-6 pb-4 rounded-lg relative">
                <div className="flex justify-center items-center mb-4">
                    <h2 className="text-xl font-bold">THÔNG TIN LỚP HỌC</h2>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 text-xl font-bold">&times;</button>


                <hr className="border-t border-black w-[calc(100%+3rem)] -mx-6 my-4" />

                <div className="mb-2 text-justify">
                    <p>Đồ án tổng hợp - Hướng công nghệ phần mềm (CO3103)</p>
                </div>
                <div className="flex items-center mb-2 text-justify w-full">
                    <img src={ClassImg1} alt="Giảng viên" className="w-5 h-5 mr-2" />
                    <p>Giảng viên phụ trách: Lê Đình Thuận</p>
                </div>
                <div className="flex items-center mb-2 text-justify w-full">
                    <img src={ClassImg2} alt="Lớp" className="w-5 h-5 mr-2" />
                    <p>Lớp: L04</p>
                </div>
                <div className="flex items-center text-justify w-full">
                    <img src={ClassImg3} alt="Tình trạng" className="w-5 h-5 mr-2" />
                    <p>Tình trạng: Đang học / Đã kết thúc</p>
                </div>
            </div>
        </div>
    );
};

export default ClassInfoModal;

export { };