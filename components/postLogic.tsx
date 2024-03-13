'use client'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChat, deletePost } from '@/lib/actions';
import { Button } from "./ui/button";
import Image from "next/image";

const PostServer= ({query}: {query:string;}) => {
  const [posts, setPosts] = useState<any[]>([])
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState<any>()
  useEffect(() => {
    const getPosts = async (query:string) => {
      try{
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            query: query
          })
        })
        const result = await response.json()
        setPosts(result)
      } catch(error) {
        console.log("error calling the posts",error);
      }
      
    }
    const getUser = async () => {
      try {
        const response = await fetch('/api/user')
        const userResult = await response.json() 
        setUser(userResult)
      }
      catch (err) {
        console.log("error fetching user:", err)
      }
    }
    getPosts(query);
    getUser();
  },[query,refresh,setRefresh])
  console.log("query in logic", query)
  // make user undefined for conditions below
  if (user === "") setUser(undefined);
  console.log("user in posts", user)
  const router = useRouter();
  const clickDelete = (id: string) => {
    // server function but works in client component, same for chatWithPoster
    // works as you don't need to use any data from the function
    deletePost(id);
    console.log("delete button pressed")
    setRefresh(!refresh)
  }
  const chatWithPoster = async (id: string, post_creator_id: string, post_name: string) => {
    console.log("chat button pressed")
    const chatId = await createChat("", id, post_name, post_creator_id);
    router.push(`/chat/${chatId}`)
    router.refresh()
  }
  if (posts.length===0) {
    return <div className="font-semibold text-center text-blue-400">Loading...</div>
  }
  return (
    <div>
      <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>Latest Posts</h1>
      <ul className='mx-auto w-80'>
        {posts?.map((post: any) => (
          <li key={post.id} className='mb-4'>
            <Card className='hover:bg-gray-400' >
              <CardHeader>
                {post.image_string !== null && <Image width={300} height={300} src={post.image_string[0]} alt="post-image-1" onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }} className='mx-auto mb-1' style={{maxHeight: '300px', maxWidth: '100%'}}/>}
                <CardTitle onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }}>{post.title}</CardTitle>
                <CardDescription onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }}>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }}>{post.readable_time}</CardFooter>
              <CardFooter onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }}>{post.user_name}</CardFooter>
              {user?.id === post.user_id && <Button onClick={() => clickDelete(post.id)} variant="outline" className='mb-2 hover:bg-red-600'>Delete</Button>}
              {user !==undefined && user?.id !== post.user_id && <Button onClick={() => chatWithPoster(post.id, post.user_id, post.title)} variant="outline" className='mb-2 hover:bg-blue-500'>Chat</Button>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
    )
  }
  // console.log("user in logic", user)
  // const currentUserDetails = await checkLoggedIn();
  // const posts = await fetchFilteredPosts(query);
  //client component inside server component

export default PostServer
