"use client";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoMdMic, IoMdVolumeHigh } from "react-icons/io";
import { FaRobot } from "react-icons/fa";

const Conversation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = async (e: any) => {
          const transcript = e.results[0][0].transcript;
          await handleSendMessage(transcript);
        };

        recognitionInstance.onerror = (err: any) => {
          console.error("Speech Recognition Error:", err);
        };

        recognitionInstance.onend = () => {
          console.log("Speech recognition ended.");
        };

        setRecognition(recognitionInstance);
      } else {
        console.error(
          "Speech Recognition API is not supported in this browser."
        );
      }
    }
  }, []);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (userMsg: string) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/chat", { prompt: userMsg });
      const data = res.data.result;
      console.log(data)

      setMessages((prevMessages) => [data, ...prevMessages]);
      speak(data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleMicClick = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <div className="md:pl-72 w-full bg-background text-text flex flex-col items-center">
      <Heading
        textColor="text-violet-500"
        bgColor="bg-violet-500/10"
        label="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
      />
      <div className="mt-10 flex flex-col items-center">
        <FaRobot className="text-9xl text-violet-500" />
      </div>
      <div className="mt-10 w-full px-10 flex flex-col items-center">
        {loading ? (
          <p className="text-violet-500">AI is thinking...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="flex gap-5 text-text border-2 border-color p-4 mb-4 rounded-md"
            >
              <p>{msg}</p>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-5 flex justify-center w-full">
        <button
          onClick={handleMicClick}
          className="px-4 py-2 hover:opacity-80 bg-secondary-btn text-secondary-btn-text rounded-md flex items-center gap-2"
        >
          <IoMdMic className="text-xl" />
          <span>
            {loading ? "Listening" : "Tap To Speak"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Conversation;
