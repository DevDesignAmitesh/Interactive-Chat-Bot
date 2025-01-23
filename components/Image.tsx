"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

const ImagePage = () => {
  const [userMsg, setUserMsg] = useState<string>("");
  const [photoNum, setPhotoNum] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const handleAddMessage = async () => {
    if (!userMsg || !photoNum || !resolution) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/image", {
        prompt: userMsg,
        amount: photoNum,
        resolution: resolution.replace(" ", "").toLowerCase(), // Format resolution
      });

      const data = res.data.images; // Match backend response
      console.log("data")
      console.log(data)
      setImages(data || []);
    } catch (error: any) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:pl-72 w-full bg-background text-text">
      <Heading
        textColor="text-pink-500"
        bgColor="bg-pink-500/10"
        label="Image Generator"
        description="Turn your prompt into images."
        icon={ImageIcon}
      />
      <div className="w-full px-10 mt-5 flex flex-col gap-4">
        <input
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          type="text"
          placeholder="A lion in the water."
          className="py-2 w-full px-4 border rounded-md placeholder:text-text/50 bg-transparent text-text border-gray-400"
        />
        <div className="flex justify-center items-center gap-4 w-full">
          <Dropdown
            label="Select Number of Images"
            options={["1", "2", "3", "4", "5"]}
            onSelect={(value: string) => setPhotoNum(value)}
          />
          <Dropdown
            label="Select Resolution"
            options={["512x512", "1024x1024", "2048x2048"]}
            onSelect={(value: string) => setResolution(value)}
          />
        </div>

        <Button onClick={handleAddMessage}>Generate</Button>
      </div>

      {loading ? (
        <Modal
          src="https://i.pinimg.com/736x/96/af/8d/96af8d60f3ef5b40a357169293974faf.jpg"
          alt="Loading"
          label="AI is thinking...!!"
        />
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {images.map((image, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center"
            >
              <div className="relative w-full h-48">
                <Image
                  src={image}
                  alt={`Generated ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                className="w-full flex items-center justify-center gap-2 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
                onClick={() => window.open(image, "_blank")}
              >
                <FaDownload />
                Download
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-10 mt-10 flex gap-2 items-center flex-col">
          <Modal
            src="https://st3.depositphotos.com/16203680/19128/v/1600/depositphotos_191288394-stock-illustration-cartoon-stickmen-chat-empty-speech.jpg"
            alt="Empty Chats"
            label="No images generated...!!"
          />
        </div>
      )}
    </div>
  );
};

export default ImagePage;
