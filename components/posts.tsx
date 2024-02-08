import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchPosts } from '@/lib/actions'

const Posts = async() => {
  const latestPosts = await fetchPosts(); 
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded'>Latest Posts</h1>
      <ul className='mx-auto w-80'>
        {latestPosts?.map((post) => (
          <li key={post.id} className='mb-4'>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>{post.timestamp}</CardFooter>
              <CardFooter>{post.user_id}</CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
  }
  
export default Posts;