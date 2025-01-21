"use client";

import React, { useState } from "react";

interface DropdownProps {
  items: string[]; // List of items in the dropdown
  value: string; // The current selected value
  onChange: (e: any) => void; // Callback for when an item is selected and value changes
  defaultLabel: string; // Default label for the dropdown before a selection
}

const Dropdown: React.FC<DropdownProps> = ({ items, value, onChange, defaultLabel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (item: string) => {
    onChange(item); // Update the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-[14px] text-black border whitespace-nowrap border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none"
      >
        {value || defaultLabel} {/* Display selected value or default label */}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          onClick={() => setIsOpen(false)}
        >
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
