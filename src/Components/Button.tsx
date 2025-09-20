import React from "react";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode; 
  onClick?: () => void;   
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        px-4 py-2 
        bg-blue-600 text-white text-md font-medium 
        flex items-center gap-2 rounded-full 
        transition-all duration-300 
        hover:bg-blue-700 hover:shadow-lg hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400
        cursor-pointer
      "
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
