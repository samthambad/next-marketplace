'use client'
import { createChat } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
const chatWithPoster = async (id: string, post_creator_id: string, post_name: string) => {
  console.log("chat button pressed")
  const chatId = await createChat("", id, post_name, post_creator_id);
  const router = useRouter();
  router.push(`/chat/${chatId}`)
  router.refresh()
}
const PostButtons = ({user_id, post_id, title, current_user_id}: {user_id:any, post_id:any, title:string, current_user_id:any}) => {
  console.log("current_user_id",current_user_id, "user_id", user_id)
  return (
    <div className='text-right'>
      {current_user_id?.length > 0 && user_id !== current_user_id && <Button onClick={() => chatWithPoster(post_id, user_id, title)}>Chat</Button>}
    </div>
    )
  }
  
  export default PostButtons