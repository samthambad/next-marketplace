'use client'
import React, { useEffect, useState } from 'react';
import Posts from '@/components/posts';
import { fetchFilteredPosts } from '../lib/actions';
import { checkLoggedIn } from '@/app/layout';
const PostServer= ({query}: {query:string;}) => {
  const [posts, setPosts] = useState()
  const [user, setUser] = useState()
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          query: query
        })
      })
      const result = await response.json()
      setPosts(result)
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
    getPosts();
    getUser();
  },[])
  
  console.log("does",posts)
  // const currentUserDetails = await checkLoggedIn();
  // const posts = await fetchFilteredPosts(query);
  //client component inside server component
  return (
    <Posts posts={posts} user={ user ?? "" } /> 
  )
}

export default PostServer
