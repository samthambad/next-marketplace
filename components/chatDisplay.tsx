'use client'
// client component as I want it to periodically refresh
import Chat from '@/app/chat/page'
import { useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { createChat } from '@/lib/actions'
import { checkLoggedIn } from '@/app/layout'
const ChatDisplay = ({chatId}:{chatId:number}) => {
  const [chats, setChats] = useState<typeof Chat[]>([])
  const [createMsg, setCreateMsg] = useState("")
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch('/api/chats', {
          method:'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            chatId:chatId
          })
        }) 
        const chatResult = await response.json();
        setChats(chatResult);
      } catch (error) {
        console.log("error fetching chats",error);
      }
    }
    getChats();
  }, [createMsg])
  if (chats.length > 0) console.log("chats:", chats[0].messages);

  const handleMsg = (text:string) => {
    setCreateMsg(text);
  }

  const sendMsg = async () => {
    try {
      const user = await checkLoggedIn()
      createChat(user?.id, createMsg,)
    } catch (error) {
      console.log("error sending message", error);
    }
  }
  
  return (
    <div>
      <ul className='text-left border w-[50%] mx-auto mb-8 px-4 py-2'>
        {chats.length > 0 && chats[0].messages.map((messageObj) => { messageObj.message.length > 0 && <li>{messageObj.user_name}: {messageObj.message}</li> })}
      </ul>
      <div className='relative w-[50%] mx-auto'>
      <Textarea onChange={(e)=> handleMsg(e.target.value)} className='w-full mx-auto mb-2 px-3 py-2 border rounded-md'/>
      <Button onClick={() => sendMsg} className='absolute bottom-2 right-2' variant="outline" >Send</Button>
      </div>
    </div>
  )
}

export default ChatDisplay
