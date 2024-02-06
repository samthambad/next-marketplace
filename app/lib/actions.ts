'use server';
import { createClient } from '@supabase/supabase-js';
import { timeStamp } from 'console';
import { z } from 'zod';
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("key or url is missng from env variables!")
}

const supabase = createClient(supabaseUrl, supabaseKey)
const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
})

const PostAcceptedSchema = PostSchema.omit({id:true})

export async function createPost(formData: FormData) {
  const { title, description, timestamp } = PostAcceptedSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    timestamp: new Date().toISOString(),
  })
  
  let {error} = await supabase.from('posts').insert({
    title: title,
    description: description,
    timestamp: timestamp,
  })
  console.log(title, description)
  if(error) {
    console.log(error);
  }
}