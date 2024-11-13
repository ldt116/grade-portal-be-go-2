import React from 'react';


interface ButtonProps {
    text: string;
    border?: boolean;
    borderBlack?: boolean;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, border, borderBlack, onClick }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={`p-4 bg-[#0388B4] text-white rounded-[2.25rem] min-w-40 text-center text-[1.75rem] font-semibold 
          ${border ? 'border' : ''} 
          ${borderBlack ? 'border-black' : ''}`}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
