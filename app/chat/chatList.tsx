import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { checkLoggedIn } from '../layout';
import { fetchFilteredChats } from '@/lib/actions';

const ChatList = async () => {
  const userDetails = await checkLoggedIn();
  const user_id = userDetails?.id ?? ""
  const rawData = fetchFilteredChats(user_id)
  
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>All Chats</h1>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
    )
  }
  
  export default ChatList