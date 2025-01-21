"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: string;
}

const CodePage = () => {
  const [userMsg, setUserMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<MessageProps[]>([]);

  const handleAddMessage: any = async () => {
    setLoading(true);
    const res = await axios.post("/api/code", { prompt: userMsg });
    const data = res.data.result;
    setLoading(false);

    setMessage((prevMsg: any) => [
      {
        message: data,
      },
      ...prevMsg,
    ]);

    setUserMsg("");
  };
  return (
    <div className="md:pl-72 w-full">
      <Heading
        label="Code Generation"
        description="Generate code using descriptive text"
        icon={Code}
      />
      <div className="w-full px-10 mt-5 flex md:flex-row flex-col gap-4">
        <input
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          type="text"
          placeholder="Make button toggler using react hooks...."
          className="py-2 w-full px-4 border rounded-md placeholder:text-black/50 border-gray-400"
        />
        <Button onClick={handleAddMessage}>Generate</Button>
      </div>

      {loading ? (
        <Modal
          src="https://i.pinimg.com/736x/96/af/8d/96af8d60f3ef5b40a357169293974faf.jpg"
          alt="Loading"
          label="Ai is thinking...!!"
        />
      ) : messages.length !== 0 ? (
        <>
          <div className="flex flex-col px-10 mt-10">
            {messages.map((msg: MessageProps, index: number) => (
              <div
                key={index}
                className="flex gap-5 bg-gray-200 p-4 mb-4 rounded-md"
              >
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className={`text-sm overflow-hidden leading-7`}
                >
                  {msg.message}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="px-10 mt-10 flex gap-2 items-center flex-col">
          <Modal
            src="https://st3.depositphotos.com/16203680/19128/v/1600/depositphotos_191288394-stock-illustration-cartoon-stickmen-chat-empty-speech.jpg"
            alt="Empty Chats"
            label="No code available...!!"
          />
        </div>
      )}
    </div>
  );
};

export default CodePage;
