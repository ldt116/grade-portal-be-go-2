import React, { useState } from "react";

interface AddSuccess {
    onClose: () => void;
}

const AddSuccess: React.FC<AddSuccess> = ({ onClose }) => {

    return (

        // <div className="bg-transparent h-screen w-full flex justify-center items-center">
        <div className="bg-white border border-gray-500 h-48 w-[300px] rounded-3xl flex flex-col justify-evenly items-center text-4xl">
            <p>
                Hoàn tất!!!
            </p>
            <button
                type='button'
                className="bg-blue-600 text-white w-[30%] h-[30%] rounded-xl text-2xl hover:bg-blue-700 duration-150"
                onClick={onClose}>
                Đóng
            </button>

        </div>

        // </div>



    );
};

export default AddSuccess;
