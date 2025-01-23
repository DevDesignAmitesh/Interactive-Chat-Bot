"use client";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { IoMdMic, IoMdVolumeHigh } from "react-icons/io";

interface MessageProps {
  message: string;
}

const CodePage = () => {
  const [userMsg, setUserMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessage] = useState<MessageProps[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = "en-US";

        recognitionInstance.onstart = () => {
          setIsListening(true); // Show listening popup when recognition starts
        };

        recognitionInstance.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          setUserMsg(transcript);
        };

        recognitionInstance.onerror = (err: any) => {
          console.error("Speech Recognition Error:", err);
        };

        recognitionInstance.onend = () => {
          setIsListening(false); // Hide listening popup when recognition ends
        };

        setRecognition(recognitionInstance); // Set the instance to state
      } else {
        console.error(
          "Speech Recognition API is not supported in this browser."
        );
      }
    }
  }, []);

  const speak = (text: string) => {
    const TEXT_TO_SPEECH = new SpeechSynthesisUtterance(text);

    // Set properties
    TEXT_TO_SPEECH.volume = 1;
    TEXT_TO_SPEECH.rate = 1;
    TEXT_TO_SPEECH.pitch = 1;
    TEXT_TO_SPEECH.lang = "hi-GB";

    window.speechSynthesis.speak(TEXT_TO_SPEECH);
  };

  const handleAddMessage: any = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/code", { prompt: userMsg });
      const data = res.data.result;
      setMessage((prevMsg: any) => [
        {
          message: data,
        },
        ...prevMsg,
      ]);
      setLoading(false);
      setUserMsg("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="md:pl-72 w-full bg-background text-text">
      <Heading
        textColor="bg-green/500"
        bgColor="bg-green-500/10"
        label="Code Generation"
        description="Generate code using descriptive text"
        icon={Code}
      />
      <div className="w-full px-10 mt-5 flex md:flex-row flex-col gap-4">
        <input
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          type="text"
          placeholder={
            isListening
              ? "Listening...."
              : "Make button toggler using react hooks...."
          }
          className="py-2 w-full bg-transparent text-text px-4 border rounded-md placeholder:text-text/50 border-gray-400"
        />
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => recognition?.start()}
            className="px-4 py-2 hover:opacity-80 bg-secondary-btn text-secondary-btn-text rounded-md"
          >
            <IoMdMic className="md:text-2xl text-xl" />
          </button>
          <Button onClick={handleAddMessage}>Generate</Button>
        </div>
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
                className="flex gap-5 border-2 border-color bg-secondary-btn text-secondary-btn-text p-4 mb-4 rounded-md"
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
                <IoMdVolumeHigh
                  onClick={() => speak(msg.message)}
                  className="text-2xl text-text ml-2 cursor-pointer hover:opacity-80"
                />
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
