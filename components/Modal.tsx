import Image from "next/image";
import React from "react";

const Modal = ({ src, label, alt }: { src: string; label: string, alt: string }) => {
  return (
    <div className="px-10 mt-10 flex gap-2 items-center flex-col">
      <Image
        width={200}
        height={56}
        className="rounded-md"
        src={src}
        alt={alt}
      />
      <p className="text-[15px] text-gray-500">{label}</p>
    </div>
  );
};

export default Modal;
