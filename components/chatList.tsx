'use client'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { checkLoggedIn } from '../app/layout';
import { fetchFilteredChats, fetchUserDetails } from '@/lib/actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Chat from '../app/chat/page';


async function goToChat(chat_id:number) {
  console.log("chat_id", chat_id)
}
const ChatList = ({data}:{data:Chat[]}) => {

  // console.log("dataaa", data)
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
        {data.map((chat:Chat) => (
          <TableRow key={chat.chat_id} onClick={() => goToChat(chat.chat_id)}>
            <TableCell className="text-center">{chat.title}</TableCell>
            <TableCell>{chat.latestMessage}</TableCell>
            <TableCell className="text-center">{chat.other_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    )
  }
  
  export default ChatList