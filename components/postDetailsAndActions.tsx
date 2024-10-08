"use client";
import { createChat, deletePost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
const PostDetailsAndActions = ({
  user_id,
  post_id,
  title,
  current_user_id,
  description,
  user_name,
}: {
  user_id: any;
  post_id: any;
  title: string;
  current_user_id: any;
  description: string;
  user_name: string;
}) => {
  const router = useRouter();
  const chatWithPoster = async (
    id: string,
    post_creator_id: string,
    post_name: string
  ) => {
    console.log("chat button pressed");
    const chatId = await createChat("", id, post_name, post_creator_id);
    router.push(`/chat/${chatId}`);
    router.refresh();
  };
  const clickDelete = (id: string) => {
    // server function but works in client component, same for chatWithPoster
    // works as you don't need to use any data from the function
    // doesn't delete the chat
    deletePost(id);
    router.push("/");
    router.refresh();
  };

  const editPost = (post_id: any) => {
    router.push(`/edit/${post_id}`);
    router.refresh();
  };
  return (
    <div className="flex justify-between align-middle">
      <div>
        <p>{description}</p>
        <p>
          <em>{user_name}</em>
        </p>
      </div>
      <div>
        {current_user_id?.length > 0 && user_id !== current_user_id && (
          <Button
            className="mb-2 hover:bg-blue-800 bg-slate-700 text-white"
            onClick={() => chatWithPoster(post_id, user_id, title)}>
            Chat
          </Button>
        )}
        {user_id === current_user_id && (
          <Button
            className="mb-2 hover:bg-red-700 bg-red-500 text-white mr-2"
            onClick={() => clickDelete(post_id)}>
            <MdDelete />
          </Button>
        )}
        {user_id === current_user_id && (
          <Button
            className="mb-2 hover:bg-green-700 bg-green-500 text-white"
            onClick={() => editPost(post_id)}>
            <MdEdit />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostDetailsAndActions;
