"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ChatList = ({ data }: { data: any[] }) => {
  const router = useRouter();
  // console.log("dataaa", data)
  function goToChat(chat_id: number) {
    router.push(`/chat/${chat_id}`);
    router.refresh(); //refresh otherwise it wont fetch
  }
  if (data.length === 0) {
    return <div>You have no chats</div>;
  }
  return (
    <div>
      <Table className="w-[80%] mx-auto border whitespace-nowrap shadow-md font-mono">
        <TableHeader className="bg-blue-200">
          <TableRow>
            <TableHead className="w-[20%] text-center border">
              Post Image
            </TableHead>
            <TableHead className="w-[20%] text-center border">
              Post Title
            </TableHead>
            <TableHead className="w-[20%] text-center border">
              Recent Message
            </TableHead>
            <TableHead className="w-[20%] text-center border">Time</TableHead>
            <TableHead className="w-[20%] text-center border">User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((chat) => (
            <TableRow
              key={chat.chat_id}
              onClick={() => goToChat(chat.chat_id)}
              className="hover:bg-blue-500 focus:blue-500"
            >
              <TableCell className="flex justify-center ">
                {(chat.image_string !== undefined) ? (
                  // console.log("image", chat.image_string),
                  <Image
                    width={100}
                    height={100}
                    src={chat.image_string}
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    alt="post"
                  />
                ) : <p className="text-sm text-gray-300">Post has no image</p>}
              </TableCell>
              <TableCell className="text-center border">{chat.title}</TableCell>
              <TableCell className="border">
                {chat.latest_message.substring(0, 4) === "data" ? (
                  <Image
                    src={chat.latest_message}
                    width={100}
                    height={100}
                    alt="post"
                    className="mx-auto"
                  ></Image>
                ) : (
                  chat.latest_message
                )}
              </TableCell>
              <TableCell>{chat.latest_message_time.substring(0, 31)}</TableCell>
              <TableCell className="text-center">{chat.other_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChatList;
