'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Chat from "@/app/chat/page"
import { useRouter } from 'next/navigation';


const ChatList = ({data}:{data:Chat[]}) => {
  
  const router = useRouter()
  // console.log("dataaa", data)
  function goToChat(chat_id:number) {
    router.push(`/chat/${chat_id}`)
  }
  return (
    <div>
      <h1 className='mb-4 border border-gray-300 mx-auto w-80 rounded font-bold'>All Chats</h1>
      <br className='max-md:hidden mt-4 mx-auto'/>
      <Table className='w-[80%] mx-auto border'>
        <TableHeader >
          <TableRow >
            <TableHead className="w-[20%] text-center">Post Title</TableHead>
            <TableHead className="w-[20%] text-center">Recent Message</TableHead>
            <TableHead className="w-[20%] text-center">User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((chat:typeof Chat) => (
            <TableRow key={chat.chat_id} onClick={() => goToChat(chat.chat_id)} className='hover:bg-blue-500'>
              <TableCell className="text-center">{chat.title}</TableCell>
              <TableCell>{chat.latest_message}</TableCell>
              <TableCell className="text-center">{chat.other_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    )
  }
  
  export default ChatList