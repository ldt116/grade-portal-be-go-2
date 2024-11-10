import React, { useState } from 'react';
import Button from '../../components/Button/Buttonfortsx';
import GradeSearch from "../../components/GradeSearch/GradeSearch";
import HallOfFame from "../../components/HallOfFame/HallOfFame";
import GradeTable from "../../components/GradeTable/GradeTable";
import ClassInfoModal from "../../components/Modal/ClassInfo";
import FeedbackModal from "../../components/Modal/FeedBack"; // Thêm import cho FeedbackModal

function GradeInfo() {
    const [isClassInfoOpen, setClassInfoOpen] = useState(false);
    const [isFeedbackOpen, setFeedbackOpen] = useState(false);

    const handleOpenClassInfo = () => {
        setClassInfoOpen(true);
    };

    const handleCloseClassInfo = () => {
        setClassInfoOpen(false);
    };

    const handleOpenFeedback = () => {
        setFeedbackOpen(true);
    };

    const handleCloseFeedback = () => {
        setFeedbackOpen(false);
    };

    return (
        <div className="mt-40 w-full px-9">
            <div className="text-[5rem] py-4 px-20 text-center">Tra cứu điểm</div>
            <div className="flex gap-8">
                <div className="w-2/3">
                    <GradeSearch />
                </div>
                <div className="w-1/3">
                    <HallOfFame />
                </div>
            </div>
            <div className="w-full mt-7">
                <GradeTable />
            </div>
            <div className="flex gap-8 justify-center my-7">
                {/* Nút "Thông tin lớp học" và "Gửi phản hồi" với sự kiện onClick */}
                <Button text="Thông tin lớp học" onClick={handleOpenClassInfo} />
                <Button text="Gửi phản hồi" onClick={handleOpenFeedback} />
            </div>

            {/* Modals */}
            <ClassInfoModal isOpen={isClassInfoOpen} onClose={handleCloseClassInfo} />
            <FeedbackModal isOpen={isFeedbackOpen} onClose={handleCloseFeedback} />
        </div>
    );
}

export default GradeInfo;
