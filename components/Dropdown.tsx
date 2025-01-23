"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (e: any) => void;
}

const Dropdown = ({ label, options, onSelect }: DropdownProps) => {
  const [selected, setSelected] = useState(label);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left px-1 w-full">
      {/* Dropdown Header */}
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-text bg-transparent border border-gray-300 rounded-md shadow-sm flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="mr-2 text-[13px]">{selected}</span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-background text-text border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-secondary-btn hover:text-secondary-btn-text transition-all"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
