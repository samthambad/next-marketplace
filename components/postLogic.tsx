import React from 'react';
import Posts from '@/components/posts';
import { fetchFilteredPosts } from '../lib/actions';
const PostServer= async({query}: {query:string;}) => {
  const posts = await fetchFilteredPosts(query);
  //client component inside server component
  console.log("posts in postServer", posts)
  return (
    <Posts posts = {posts}/> 
  )
}

export default PostServer
