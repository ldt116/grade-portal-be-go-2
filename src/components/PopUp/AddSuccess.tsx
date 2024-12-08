import React, { useState } from "react";

interface AddSuccess {
    onClose: () => void;
}

const AddSuccess: React.FC<AddSuccess> = ({ onClose }) => {

    return (

        // <div className="bg-transparent h-screen w-full flex justify-center items-center">
        <div className="bg-white border border-black h-48 w-96 rounded-3xl flex flex-col justify-evenly items-center text-4xl">
            <p>
                Hoàn tất!!!
            </p>
            <button
                type='button'
                className="bg-[#0388B4] text-white w-[44%] h-[34%] rounded-full text-3xl"
                onClick={onClose}>
                Xác nhận
            </button>

        </div>

        // </div>



    );
};

export default AddSuccess;
