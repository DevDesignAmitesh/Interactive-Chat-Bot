import React from "react";

interface HeadingProps {
  label: string;
  description: string;
  icon: any;
}

const Heading = ({ label, description, icon: Icon }: HeadingProps) => {
  return (
    <div className="w-full flex gap-4 px-10">
      <Icon className="h-12 p-2 w-12 text-violet-500 bg-violet-500/10" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{label}</h1>
        <p className="text-[14px] text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
