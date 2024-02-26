import React from 'react';
import Posts from '@/components/posts';
import { fetchFilteredPosts } from '../lib/actions';
import { checkLoggedIn } from '@/app/layout';

const PostServer= async({query}: {query:string;}) => {
  const currentUserDetails = await checkLoggedIn();
  const posts = await fetchFilteredPosts(query);
  //client component inside server component
  return (
    <Posts posts={posts} user={ currentUserDetails } /> 
  )
}

export default PostServer
