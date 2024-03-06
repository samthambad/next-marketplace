'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { createChat } from '@/lib/actions'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
const RealtimeChatDisplay = ({chats}:{chats:any}) => {
  const router = useRouter();
  const [createMsg, setCreateMsg] = useState("")
  const [chatsDisplayed, setChatsDisplayed] = useState(chats)
  useEffect(() => { 
    router.refresh();
    const channel = supabase.channel('realtime chats').on('postgres_changes', {
      event: 'UPDATE', schema: 'public', table: 'allChats'
    }, (payload) => {
      setChatsDisplayed(payload.new)
    }).subscribe()

    return () => {supabase.removeChannel(channel)}
  },[supabase, chatsDisplayed, setChatsDisplayed])

  const handleMsg = (text: string) => {
    setCreateMsg(text);
  }
  const sendMsg = async () => {
    console.log("button clicked")
    try {
      await createChat(createMsg, chatsDisplayed.post_id, chatsDisplayed.post_name)
    } catch (error) {
      console.log("error sending message", error);
    }
  }
  console.log("chats:", chatsDisplayed)
  return (
    <div>
      <Suspense fallback=<div>Loading...</div> >
        <ul className='text-left border w-[50%] mx-auto mb-8 px-4 py-2'>
          {chatsDisplayed.messages.map((messageObj: any) => {
            if (messageObj.message.length > 0) {
              return <li>{messageObj.user_name}: {messageObj.message}</li>
            }
          })}
        </ul>
      </Suspense>
        <div className='relative w-[50%] mx-auto'>
          <Textarea onChange={(e) => handleMsg(e.target.value)} className='w-full mx-auto mb-2 px-3 py-2 border rounded-md' />
          <Button onClick={() => sendMsg()} className='absolute bottom-2 right-2' variant="outline" >Send</Button>
        </div>
    </div>
  )
  }
  
  export default RealtimeChatDisplay