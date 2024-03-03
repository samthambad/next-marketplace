'use client'
import React, { useEffect, useState } from 'react';
import Posts from '@/components/posts';

const PostServer= ({query}: {query:string;}) => {
  const [posts, setPosts] = useState()
  const [user, setUser] = useState()
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
  },[query])
  console.log("query in logic", query)
  console.log("user in logic", user)
  // const currentUserDetails = await checkLoggedIn();
  // const posts = await fetchFilteredPosts(query);
  //client component inside server component
  return (
    <Posts posts={posts} user={ user ?? "" } /> 
  )
}

export default PostServer
