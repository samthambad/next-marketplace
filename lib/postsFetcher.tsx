'use client'
import React, { useEffect, useState } from "react";
import Posts from "@/components/posts";

const PostsFetcher = async ({ query }: { query: string; }) => {
  const [postsData, setPostsData] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async () => {
      // different from url on browser
      try {
        
        const response = await fetch(`/api/posts?query=${query}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // this line sends a request to the `/api/posts` endpoint with
        //  a query parameter, waits for the response, and then stores that response in the`response` variable
        // for further processing, such as extracting the JSON data with `response.json()`.
        const data = await response.json();
        console.log(data)
        setPostsData(data);
      }
      catch (error) {
        console.log("Error is:", error);
      }
    } 
    if (query) fetchData();

  }, [query]);//if anything in array changes trigger fetchFilteredPosts
  return (
    <Posts postData= {postsData}/>
    )
  }
  export default PostsFetcher;