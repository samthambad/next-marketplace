"use client";
import React, { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { toast } from "react-hot-toast"
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createChat, message } from "@/lib/actions";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
const RealtimeChatDisplay = ({ chats }: { chats: any }) => {
  const [createMsg, setCreateMsg] = useState("");
  const [chatsDisplayed, setChatsDisplayed] = useState(chats);
  useEffect(() => {
    const channel = supabase
      .channel("realtime chats")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "allChats",
        },
        (payload) => {
          setChatsDisplayed(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatsDisplayed, setChatsDisplayed, createMsg]);

  const handleMsg = (text: string) => {
    setCreateMsg(text);
  };
  const sendMsg = async (msg: string) => {
    try {
      const sendingMessageToast = toast.loading("Sending message")
      await createChat(msg, chatsDisplayed.post_id, chatsDisplayed.post_name);
      const textElement = document.getElementById("text");
      if (textElement) {
        (textElement as HTMLInputElement).value = "";
        toast.dismiss(sendingMessageToast)
      }
    } catch (error) {
      toast.error("Error sending message")
      console.log("error sending message", error);
    }
    toast.success("Message sent")
  };
  const fileClick = () => {
    document.getElementById("fileInput")?.click();
  };
  const handleFileChange = async (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let base64Img: string = "";
      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          base64Img = reader.result as string;
          resolve();
        };
      });

      if (base64Img.length > 0) {
        await sendMsg(base64Img)
      }
    }
  };
  return (
    <div className="overflow-x-auto font-mono">
      {chatsDisplayed.messages.length > 0 &&
        chatsDisplayed.messages[0].message !== "" && (
          <ul className="text-left border rounded  mx-2 my-4 px-4 py-2 overflow-auto shadow hover:shadow-sm dark:hover:shadow-white">
            {chatsDisplayed.messages.map((messageObj: message, index: number) => {
              if (messageObj.message.substring(0, 4) === "data") {
                return (
                  <div key={index}>
                    <div className="text-sm flex justify-between" >{messageObj.user_name}:</div>
                    <div className="flex justify-between">
                      <Image
                        src={messageObj.message}
                        alt="chat"
                        width={300}
                        height={100}
                        className="mr-2"
                      />
                      <span className="justify-end text-xs text-gray-400 content-end place-self-end pb-1">{messageObj.readable_time?.substring(0, 31)}</span>
                    </div>
                  </div>
                );
              } else if (messageObj.message.length > 0) {
                return (
                  <li key={index} className="text-sm whitespace-nowrap">
                    <div className="flex justify-between">
                      <span className="mr-2">
                        {messageObj.user_name}: <span className="font-semibold text-slate-700">{messageObj.message}</span>
                      </span>
                      <span className="justify-end text-xs text-gray-400"><em>{messageObj.readable_time?.substring(0, 31)}</em></span>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        )}
      <div className="flex justify-center items-center p-4">
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col sm:flex-row items-stretch shadow-md border border-blue-300 bg-white rounded-lg p-2">
          <div className="flex items-center sm:self-stretch order-first sm:order-none">
            <Button
              className="flex-shrink-0 p-2 my-2 sm:my-0 sm:mr-2 hover:bg-slate-700 hover:text-white w-full"
              variant="outline"
              onClick={fileClick}
            >
              <FaFileUpload className="w-5 h-5" />
            </Button>
          </div>
          <Textarea
            id="text"
            onChange={(e) => handleMsg(e.target.value)}
            className="flex-grow px-3 py-2 resize-none min-h-[100px] sm:min-h-0 order-last sm:order-none my-2 sm:my-0 sm:mx-2"
            placeholder="Enter message..."
          />
          <div className="flex items-center sm:self-stretch order-2 sm:order-none">
            <Button
              onClick={() => sendMsg(createMsg)}
              className="flex-shrink-0 p-2 my-2 sm:my-0 hover:bg-slate-700 hover:text-white w-full"
              variant="outline"
            >
              <MdSend className="w-5 h-5" />
            </Button>
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RealtimeChatDisplay;
