import React from "react";

interface HeadingProps {
  label: string;
  description: string;
  icon: any;
  textColor: string;
  bgColor: string;
}

const Heading = ({ label, description, icon: Icon, textColor, bgColor }: HeadingProps) => {
  return (
    <div className="w-full flex gap-4 px-10">
      <Icon className={`h-12 p-2 w-12 ${textColor} ${bgColor}`} />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{label}</h1>
        <p className="text-[14px] text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
