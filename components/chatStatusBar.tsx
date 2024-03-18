"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const ChatStatusBar = ({
  postTitle,
  image_string_first,
  postId,
}: {
  postTitle: string;
  image_string_first: string;
  postId: string;
}) => {
  const router = useRouter();

  const goToPost = (post_id: string) => {
    router.push(`/post/${post_id}`);
    router.refresh();
  };
  return (
    <div className="flex p-2 items-center mx-4 justify-between gap-[2vw] mb-10 pt-2 pb-2 border rounded mx-auto shadow-md hover:shadow-sm dark:hover:shadow-white">
      <span className="font-bold">{postTitle}</span>
      {image_string_first !== "" && (
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
      )}
    </div>
  );
};

export default ChatStatusBar;
