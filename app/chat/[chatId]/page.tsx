import ChatDisplay from '@/components/chatDisplay';
import React from 'react'

const EachChat = async ({params}: {params : {chatId:string}}) => {
  // fetch chat data from supabase using chatId
  return (
    <div>
      <ChatDisplay chatId={params.chatId}/>
    </div>
  )
}

export default EachChat;