"use server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error("key or url is missng from env variables!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkLoggedIn() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();
  return data.session?.user;
}

export async function createPost(formData: FormData) {
  console.log("uploading images to supabase");
  const userDetails = await checkLoggedIn();
  const imageArray: string[] = [];
  // max 5 images allowed
  for (let i = 0; i < 5; i++) {
    if (formData.get(`image${i}`) === undefined) {
      break;
    }
    const image = formData.get(`image${i}`);
    if (image === undefined) {
      break;
    }
    if (typeof image === "string") {
      imageArray.push(image);
    }
  }
  let { error } = await supabase.from("posts").insert({
    title: formData.get("title"),
    description: formData.get("description"),
    image_string: imageArray,
    readable_time: new Date().toString(),
    user_id: userDetails?.id,
    user_name: userDetails?.user_metadata.name,
  });
  if (error) {
    console.log("logged in and other error", error);
  }
}

// fetch data from supabase
export async function fetchPosts() {
  // fetch data from supabase and order by timestamp latest and limit
  let { data, error } = await supabase
    .from("posts")
    .select()
    .order("timestamp", { ascending: false })
    .limit(10);
  if (error) {
    console.log("fetching all posts error:", error);
  }
  return data;
}

export async function fetchFilteredPosts(query: string) {
  if (query === undefined || query.length === 0) {
    return await fetchPosts();
  }
  // fetch data from supabase and order by timestamp latest and limit

  let { data, error } = await supabase
    .from("posts")
    .select()
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("timestamp", { ascending: false });
  if (error) {
    console.log("fetching filtered posts error", error);
  }
  return data;
}

export async function fetchFilteredPostsUid(userDetails: any) {
  if (userDetails === null || userDetails === undefined) return
  console.log("user details:", userDetails?.id);
  let { data, error } = await supabase
    .from("posts")
    .select()
    .match({ user_id: userDetails?.id });
  if (error) {
    console.log("fetching filtered posts by uid error", error);
  }
  return data;
}

export async function fetchFilteredPostId(post_id: string) {
  let { data, error } = await supabase
    .from("posts")
    .select()
    .match({ id: post_id });
  if (error) {
    console.log("fetching filtered posts error", error);
  }
  console.log("post data:", data);
  return data?.[0];
}

export async function deletePost(id: string) {
  let { error } = await supabase.from("posts").delete().match({ id: id });
  if (error) {
    console.log("deleting post error:", error);
  }
}

export async function fetchFilteredChatsUserId(user_id: string) {
  if (user_id === undefined || user_id.length === 0) {
    console.log("user id is undefined");
    return;
  }
  let { data, error } = await supabase
    .from("allChats")
    .select()
    .or(`p1_id.eq.${user_id},p2_id.eq.${user_id}`)
    .order("timestamp", { ascending: false });
  if (error) {
    console.log("loading chats for user error:", error);
  }
  return data;
}

export async function fetchFilteredChatsChatId(chat_id: string) {
  if (chat_id === undefined || chat_id.length === 0) {
    console.log("user id is undefined");
    return;
  }
  let { data, error } = await supabase
    .from("allChats")
    .select()
    .match({ id: chat_id });
  if (error) {
    console.log("loading chats for user error:", error);
  }
  return data;
}

export interface message {
  message: string;
  user_id: string;
  user_name: string;
  time: string;
}
export async function createChat(
  newMessage: string,
  post_id: string,
  post_name: string,
  user_id_post_creator?: string
) {
  const timestamp: string = new Date().toString()
  // if the same post_id and same users are there, then dont create a new chat
  console.log("the new msg:", newMessage);
  const userDetails = await checkLoggedIn();
  const userId = userDetails?.id ?? "";
  if (userId.length === 0) {
    console.log("user id is undefined");
    return;
  }
  const dataBeforeAdding = await checkIfAlreadyPresentChat(userId, post_id);
  // chat already present
  console.log("previous data:", dataBeforeAdding);
  if (dataBeforeAdding?.length !== undefined && dataBeforeAdding?.length > 0) {
    console.log("chat already exists");
    // get the messages array from dataBeforeAdding and append firstMessage
    let messagesArray: message[] = dataBeforeAdding?.[0].messages;
    console.log("previous messagesArray:", messagesArray);
    // cleanup messageArray by removing messageObj with message = ""
    messagesArray = messagesArray.filter(
      (messageObj) => messageObj.message.length > 0
    );
    messagesArray.push({
      message: newMessage,
      user_id: userId,
      user_name: userDetails?.user_metadata.name,
      time: timestamp,
    });
    let { error } = await supabase
      .from("allChats")
      .update({ messages: messagesArray })
      .match({ post_id: post_id })
      .or(`p1_id.eq.${userId},p2_id.eq.${userId}`);
    let { data } = await supabase
      .from("allChats")
      .select()
      .or(`p1_id.eq.${userId},p2_id.eq.${userId}`)
      .match({ post_id: post_id });
    console.log("checking for chatId:", data);
    if (error) {
      console.log("error updating chat:", error);
      return;
    }
    return data?.[0].id;
  }
  // chat not already present
  else {
    console.log("chat doesn't exist");
    const messagesArray: message[] = [
      {
        message: newMessage,
        user_id: userId,
        user_name: userDetails?.user_metadata.name,
        time: timestamp,
      },
    ];
    console.log("new messagesArray:", messagesArray);
    let { error } = await supabase.from("allChats").insert({
      messages: messagesArray,
      post_id: post_id,
      p1_id: userDetails?.id,
      p2_id: user_id_post_creator,
      post_name: post_name,
    });
    let { data } = await supabase
      .from("allChats")
      .select()
      .match({ p1_id: userId, post_id: post_id });
    // console.log("checking for chatId:", data?.[0].id);
    if (error) {
      console.log("error creating chat:", error);
    }
    return data?.[0].id;
  }
}

export async function checkIfAlreadyPresentChat(
  user_id: string,
  post_id: string
) {
  // let { data, error } = await supabase.from('allChats').select().match({ p1_id: user_id, post_id: post_id })
  let { data, error } = await supabase
    .from("allChats")
    .select()
    .or(`p1_id.eq.${user_id},p2_id.eq.${user_id}`)
    .match({ post_id: post_id });
  if (error) {
    console.log("error checking if already present chat:", error);
  }
  // console.log("data", data)
  return data;
}

export async function fetchUserDetails(user_id: string) {
  console.log("user_id:", user_id);
  const { data, error } = await supabase.auth.admin.getUserById(user_id);
  if (error) {
    console.log("error fetching user details:", error);
    return;
  }
  // console.log("user details:", data);
  return data;
}

export async function fetchImageString(post_id: string) {
  let { data, error } = await supabase
    .from("posts")
    .select()
    .match({ id: post_id });
  if (error) {
    console.log("error fetching image string:", error);
    return;
  }
  if (data?.[0] !== undefined) {
    const { image_string } = data[0];
    if (image_string !== null) return image_string[0];
  } else {
    console.log("supabase data is null");
    return;
  }
}
