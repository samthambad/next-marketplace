'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const ChatStatusBar = ({postTitle, image_string_first, postId}: {postTitle: string, image_string: string, postId:string}) => {
  const router = useRouter();

  const goToPost = (post_id: string) => {
    router.push(`/post/${post_id}`);
    router.refresh();
  }
  return (
    <div className='flex p-2 items-center w-[50%] justify-between gap-[2vw] mb-10 pt-2 pb-2 border rounded mx-auto'>
      <span className="font-bold">{postTitle}</span>
      <img src={image_string_first} style={{maxWidth: '100px', maxHeight:'100px'}} onClick={() => {goToPost(postId)}}></img>
    </div>
    )
  }
  
  export default ChatStatusBar