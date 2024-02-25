import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchFilteredPosts } from '@/lib/actions';

const Posts = async({query}: {query:string;}) => {
  const posts = await fetchFilteredPosts(query);
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>Latest Posts</h1>
      <p className='mb-8'> <em>Refresh the page for new posts</em></p>
      <ul className='mx-auto w-80'>
        {posts?.map((post) => (
          <li key={post.id} className='mb-4'>
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>{post.readable_time}</CardFooter>
              <CardFooter>{post.user_name}</CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
  }
  
export default Posts;
