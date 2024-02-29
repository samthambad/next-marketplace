'use client'
import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { createChat, deletePost } from '@/lib/actions'
import { useRouter } from 'next/navigation'
//interactivity is required soon
const Posts = ({posts, user} : {posts:any, user:any}) => {
  const router = useRouter();
  const clickDelete = (id:string) => {
    // server function but works in client component, same for chatWithPoster
    // works as you don't need to use any data from the function
    deletePost(id);
    router.refresh();
  }
  const chatWithPoster = (id:string, otherUserId:string, post_name:string) => {
    console.log("chat button pressed")
    createChat(otherUserId, "hi", id, post_name);
  }
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>Latest Posts</h1>
      <p className='mb-8'> <em>Refresh the page for new posts</em></p>
      <ul className='mx-auto w-80'>
        {posts?.map((post:any) => (
          <li key={post.id} className='mb-4'>
            <Card className='hover:bg-gray-400'>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>{post.readable_time}</CardFooter>
              <CardFooter>{post.user_name}</CardFooter>
              {user?.id === post.user_id && <Button onClick={()=>clickDelete(post.id)} variant="outline" className='mb-2 hover:bg-red-600'>Delete</Button>}
              {user && user?.id !== post.user_id && <Button onClick={()=>chatWithPoster(post.id, post.user_id, post.title)} variant="outline" className='mb-2 hover:bg-blue-500'>Chat</Button>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
  }
  
export default Posts;
