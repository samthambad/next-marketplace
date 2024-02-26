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
import { deletePost } from '@/lib/actions'
import { useRouter } from 'next/navigation'
//interactivity is required soon
const Posts = ({posts, user} : {posts:any, user:any}) => {
  const router = useRouter();
  const clickDelete = (id:string) => {
    deletePost(id);
    router.refresh();
  }
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>Latest Posts</h1>
      <p className='mb-8'> <em>Refresh the page for new posts</em></p>
      <ul className='mx-auto w-80'>
        {posts?.map((post:any) => (
          <li key={post.id} className='mb-4'>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>{post.readable_time}</CardFooter>
              <CardFooter>{post.user_name}</CardFooter>
              {user?.id === post.user_id && <Button onClick={()=>clickDelete(post.id)} variant="outline" className='mb-2'>Delete</Button>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
  }
  
export default Posts;
