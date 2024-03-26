"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const ChatStatusBar = ({
  postTitle,
  image_string_first,
  postId,
  otherUser,
}: {
  postTitle: string;
  image_string_first: string;
  postId: string;
  otherUser: any;
}) => {
  const router = useRouter();

  const goToPost = (post_id: string) => {
    router.push(`/post/${post_id}`);
    router.refresh();
  };
  console.log("otherUser details", otherUser)
  const otherUserId = otherUser.user.id
  const otherUserName = otherUser.user.user_metadata.name

  const goToUser = () => {
    router.push(`/profile/${otherUserId}`)
    router.refresh();
  }
  console.log("image_string_first", image_string_first)
  return (
    <div className="flex p-2 mx-4 justify-between items-center gap-[2vw] mb-10 pt-2 pb-2 border rounded shadow-md hover:shadow-sm dark:hover:shadow-white">
      <div>
        {postTitle !== "" ?
        (<span className="font-semibold mb-2">{postTitle}</span>) :
        <span>Post has no title</span>}
        
        {image_string_first !== "" ?(
          <Image
            width={100}
            height={100}
            src={image_string_first}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            onClick={() => {
              goToPost(postId);
            }}
            alt="post"
          />
        ):<p className="text-sm text-gray-300">Post has no image</p>}
      </div>
      <p className="hover:text-blue-500" onClick={goToUser}>
        {otherUserName}
      </p>
    </div>
  );
};

export default ChatStatusBar;
