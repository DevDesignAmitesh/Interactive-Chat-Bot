"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ImageIcon, UserIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Dropdown from "./Dropdown";

const ImagePage = () => {
  const [userMsg, setUserMsg] = useState<string>("");
  const [photoNum, setPhotoNum] = useState<string>("");
  const [resolution, setResolution] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const handleAddMessage: any = async () => {
    // setLoading(true);
    // const res = await axios.post("/api/image", { prompt: userMsg });
    // const data = res.data.result;
    // setLoading(false);
    console.log(userMsg, photoNum, resolution);
  };

  return (
    <div className="md:pl-72 w-full">
      <Heading
        label="Image Generator"
        description="Turn your prompt into image. "
        icon={ImageIcon}
      />
      <div className="w-full px-10 mt-5 flex lg:flex-row flex-col gap-4">
        <input
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          type="text"
          placeholder="A lion in the water."
          className="py-2 w-full px-4 border rounded-md placeholder:text-black/50 border-gray-400"
        />
        <div className="flex justify-center items-center gap-2">
          <Dropdown
            defaultLabel="Number of photos"
            items={["1", "2", "3", "4", "5"]}
            value={photoNum}
            onChange={(e: any) => setPhotoNum(e.target.value)}
          />
          <Dropdown
            defaultLabel="Resolution of photo"
            items={["256 x 256", "512 x 512", "1024 x 1024"]}
            value={resolution}
            onChange={(e: any) => setResolution(e.target.value)}
          />
        </div>
        <Button onClick={handleAddMessage}>Generate</Button>
      </div>

      {loading ? (
        <Modal
          src="https://i.pinimg.com/736x/96/af/8d/96af8d60f3ef5b40a357169293974faf.jpg"
          alt="Loading"
          label="Ai is thinking...!!"
        />
      ) : images.length !== 0 ? (
        <>
          <div className="flex flex-col px-10 mt-10">
            {images.map((msg: string) => (
              <div
                key={msg}
                className="flex gap-5 bg-gray-200 p-4 mb-4 rounded-md"
              >
                <div className="p-2 rounded-full">
                  <UserIcon size={30} />
                </div>
                <p>{msg}</p>
              </div>
            ))}
          </div>
        </>
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
