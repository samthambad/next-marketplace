'use server';
import { checkLoggedIn } from '@/app/layout';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod'; //for schema
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("key or url is missng from env variables!")
}

const supabase = createClient(supabaseUrl, supabaseKey)

// to insert post data inside supabase
const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
})

const PostAcceptedSchema = PostSchema.omit({id:true})

export async function createPost(formData: FormData) {
  const userDetails = await checkLoggedIn();
  if (userDetails) {
    console.log(userDetails.id);
  }
  const { title, description, timestamp } = PostAcceptedSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    timestamp: new Date().toISOString(),
  })
  
  let {error} = await supabase.from('posts').insert({
    title: title,
    description: description,
    timestamp: timestamp,
    user_id: userDetails?.id,
  })
  console.log(title, description)
  if(error) {
    console.log(error);
  }
}

// fetch data from supabase
export async function fetchPosts() {
  // fetch data from supabase and order by timestamp latest and limit 
  let {data, error} = await supabase.from('posts').select('*').order('timestamp').limit(5)
  if(error) {
    console.log(error);
  }
  console.log(data);
  return data;
}