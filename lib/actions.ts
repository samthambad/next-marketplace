'use server';
import { checkLoggedIn } from '@/app/layout';
import { createClient } from '@supabase/supabase-js';
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("key or url is missng from env variables!")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function createPost(formData: FormData) {
  const userDetails = await checkLoggedIn();
  let {error} = await supabase.from('posts').insert({
    title: formData.get("title"),
    description: formData.get("description"),
    readable_time:(new Date()).toString(), 
    user_id: userDetails?.id,
    user_name: userDetails?.user_metadata.name,
  })
  if(error) {
    console.log("logged in and other error",error);
  }
}

// fetch data from supabase
export async function fetchPosts() {
  // fetch data from supabase and order by timestamp latest and limit 
  let {data, error} = await supabase.from('posts').select().order('timestamp',{ascending: false}).limit(5)
  if(error) {
    console.log("fetching all posts error:",error);
  }
  return data;
}

export async function fetchFilteredPosts(query:string) {
  if (query === undefined || query.length === 0) {
    return fetchPosts();
  }
  // fetch data from supabase and order by timestamp latest and limit 
  console.log("type of query:", typeof(query))
  let { data, error } = await supabase.from('posts').select().or(`title.ilike.%${query}%,description.ilike.%${query}%`).order('timestamp', { ascending: false })
  if(error) {
    console.log("fetching filtered posts error",error);
  }
  return data;
}

export async function deletePost(id: string) {
  let {error} = await supabase.from('posts').delete().match({id: id})
  if(error) {
    console.log("deleting post error:", error);
  }
}

export async function fetchFilteredChats(user_id: string) {
  if (user_id === undefined || user_id.length === 0) {
    console.log("user id is undefined");
    return;
  }
  let { data, error } = await supabase.from('allChats').select().or(`p1_id.eq.%${user_id}%,p2_id.eq.%${user_id}%`).order('timestamp', { ascending: false })
  if(error) {
    console.log("loading chats for user error:", error);
  }
  return data;
}

export async function createChat(other_user_id: string, firstMessage: string, post_id: string) {
  const userDetails = await checkLoggedIn();
  // get the post details from post_id
  const messagesArray: string[] = [firstMessage]
  let { error }=await supabase.from('allChats').insert({
    messages: messagesArray,
    post_id: post_id,
    p1_id: userDetails?.id,
    p2_id: other_user_id,
  })
  if (error) {
    console.log("error creating chat:", error);
  }
}