import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { checkLoggedIn } from '../layout';
import { fetchFilteredChats, fetchUserDetails } from '@/lib/actions';

interface Chat {
  title: string;
  latestMessage: string;
  other_name: string;
}
async function getData(): Promise<Chat[]> {
  const userDetails = await checkLoggedIn();
  const user_id = userDetails?.id ?? ""
  let otherName:string = ""
  let other_id = "";
  let arrayOfChats:Chat[] = []
  if (user_id.length > 0) {
    const rawData = await fetchFilteredChats(user_id);
    console.log("rawData", rawData)
    const promiseArray = rawData?.map(async (chat) => {
      // get the name from auth
      if (chat.p1_id === user_id) {
        const otherUserDetails = await fetchUserDetails(chat.p2_id);
        otherName = otherUserDetails?.user.user_metadata.name;
      } else if (chat.p2_id === user_id) {
        const otherUserDetails = await fetchUserDetails(chat.p1_id);
        otherName = otherUserDetails?.user.user_metadata.name;
      }
      console.log("name", otherName)
      arrayOfChats.push({
        title: chat.post_name,
        latestMessage: chat.messages[chat.messages.length-1],
        other_name: otherName
      })
    })
    await Promise.all(promiseArray) //wait for all the promises to  resolve
    console.log("arrayofchats",arrayOfChats)
    return arrayOfChats;
  }
}

const ChatList = async () => {

  const data = await getData();
  console.log("dataaa", data)
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>All Chats</h1>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
    )
  }
  
  export default ChatList