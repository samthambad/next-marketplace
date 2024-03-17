"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createChat } from "@/lib/actions";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Compressor from "compressorjs";
import Image from "next/image";
const RealtimeChatDisplay = ({ chats }: { chats: any }) => {
  const [createMsg, setCreateMsg] = useState("");
  const [chatsDisplayed, setChatsDisplayed] = useState(chats);
  const [uploadNow, setUploadNow] = useState(false);
  useEffect(() => {
    if (uploadNow && createMsg !== "") {
      sendMsg();
      setUploadNow(false);
    }
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
  }, [chatsDisplayed, setChatsDisplayed, uploadNow]);

  const handleMsg = (text: string) => {
    setCreateMsg(text);
  };
  const sendMsg = async () => {
    console.log("sending msg");
    try {
      await createChat(
        createMsg,
        chatsDisplayed.post_id,
        chatsDisplayed.post_name
      );
    } catch (error) {
      console.log("error sending message", error);
    }
  };
  console.log("chats:", chatsDisplayed);
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
      await new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
          base64Img = reader.result as string;
          resolve();
        };
      });

      if (base64Img.length > 0) {
        setCreateMsg(base64Img);
        console.log("base64Img:", createMsg);
        setUploadNow(true);
      }
    }
  };
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="text-left border rounded w-[50%] mx-auto mb-8 px-4 py-2 shadow-md hover:shadow-sm dark:hover:shadow-white">
          {chatsDisplayed.messages.map((messageObj: any, index: number) => {
            if (messageObj.message.substring(0, 4) === "data") {
              return (
                <div>
                  <div>{messageObj.user_name}:</div>
                  <Image
                    src={messageObj.message}
                    alt="chat"
                    width={300}
                    height={100}
                    className=""
                  />
                </div>
              );
            } else if (messageObj.message.length > 0) {
              return (
                <li key={index}>
                  {messageObj.user_name}: {messageObj.message}
                </li>
              );
            }
          })}
        </ul>
      </Suspense>
      <div className="relative w-[50%] mx-auto shadow-md border-blue-300">
        <Textarea
          onChange={(e) => handleMsg(e.target.value)}
          className="w-full mx-auto mb-2 px-3 py-2 border-transparent shadow-sm hover:shadow-sm"
          placeholder="Enter message..."
        />
        <div className="flex justify-end">
          <Button
            className="mr-2 mb-2 hover:bg-blue-500 hover:text-white"
            variant="outline"
            onClick={fileClick}
          >
            Image
          </Button>
          <Button
            onClick={() => sendMsg()}
            className="mr-2 hover:bg-blue-500 hover:text-white"
            variant="outline"
          >
            Send
          </Button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RealtimeChatDisplay;
