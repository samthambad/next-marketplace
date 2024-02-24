'use client'
import React, { useEffect, useState } from "react";
import Posts from "@/components/posts";

const PostsFetcher = ({ query }: { query: string; }) => {
  const [postsData, setPostsData] = useState<any[]>([])
  console.log("query:",query)
  useEffect(() => {
    const fetchData = async () => {
      // different from url on browser
      const response = await fetch(`/api/posts/`,{
        method:'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          query:query
        })
      })
      const result = await response.json()
      setPostsData(result);
      console.log( "result in postsFetcher",result)
    } 
    fetchData();
  }, [query]);//if anything in array changes trigger fetchFilteredPosts
  console.log("postsData:",postsData)
  return (
    <Posts postData= {postsData}/>
    )
  }
  export default PostsFetcher;
