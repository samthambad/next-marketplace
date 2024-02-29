import { fetchFilteredChatsFromId } from '@/lib/actions'
import React from 'react'

const EachChat = async ({params}: {params : {chatId:string}}) => {
  // fetch chat data from supabase using chatId
  let chatData = await fetchFilteredChatsFromId(params.chatId);
  console.log(chatData)
  return (
    <h1>ChatHeader {params.chatId}</h1>
  )
}

export default EachChat;