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
  if (userDetails) {
    console.log(userDetails.user_metadata.name, "is logged in");
  }
  let {error} = await supabase.from('posts').insert({
    title: formData.get("title"),
    description: formData.get("description"),
    timestamp: new Date().toISOString(),
    user_id: userDetails?.id,
    user_name: userDetails?.user_metadata.name,
  })
  if(error) {
    console.log("not logged in and other error",error);
  }
}

// fetch data from supabase
export async function fetchPosts() {
  // fetch data from supabase and order by timestamp latest and limit 
  let {data, error} = await supabase.from('posts').select('*').order('timestamp',{ascending: false}).limit(5)
  if(error) {
    console.log("fetching all posts error:",error);
  }
  return data;
}

export async function fetchFilteredPosts(query:string) {
  console.log("quuuery:", query)
  if (query === undefined || query.length === 0) {
    return fetchPosts();
  }
  // fetch data from supabase and order by timestamp latest and limit 
  let { data, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`).order('timestamp', { ascending: false })
  if(error) {
    console.log("fetching filtered posts error",error);
  }
  console.log("dataa", data)
  return data;
}
