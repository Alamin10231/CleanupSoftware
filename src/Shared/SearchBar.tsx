import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
}) => {
    return (
        <div className={`relative w-full max-w-lg ${className}`}>
            {/* Left icon */}
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300" />

            {/* Input field */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-full border border-gray-300 bg-white pl-10 pr-32 py-2 text-sm
                   text-gray-800  focus:outline-none
                   focus:ring-blue-400"
            />

            {/* Right icon */}
            <IoIosArrowForward className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer" />
        </div>
    );
};

export default SearchBar;