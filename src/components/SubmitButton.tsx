// Button.tsx
import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button'; // Chỉ định kiểu nút (submit hoặc button)
  onClick?: () => void; // Optional onClick function
  children: React.ReactNode; // Nội dung của nút
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
