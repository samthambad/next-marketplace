"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createChat, deletePost } from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";

const PostServer = ({ query }: { query?: string }) => {
  const [posts, setPosts] = useState<any[]>();
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState<any>();
  console.log("query is undefined", query === undefined);
  useEffect(() => {
    // get posts according to uid
    if (query === undefined) {
      const getPosts = async () => {
        try {
          console.log("getting using id");
          const response = await fetch("/api/postsUid");
          const result = await response.json();
          setPosts(result);
        } catch (error) {
          console.log("error getting posts by uid", error);
        }
      };
      getPosts();
      // get posts according to query
    } else {
      const getPosts = async (query: string) => {
        try {
          const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              query: query,
            }),
          });
          const result = await response.json();
          setPosts(result);
        } catch (error) {
          console.log("error calling the posts", error);
        }
      };
      getPosts(query);
    }
    const getUser = async () => {
      try {
        const response = await fetch("/api/user");
        const userResult = await response.json();
        setUser(userResult);
      } catch (err) {
        console.log("error fetching user:", err);
      }
    };
    getUser();
  }, [query, refresh, setRefresh]);
  // console.log("query in logic", query);
  // make user undefined for conditions below
  if (user === "") setUser(undefined);
  const router = useRouter();
  const clickDelete = (id: string) => {
    // server function but works in client component, same for chatWithPoster
    // works as you don't need to use any data from the function
    deletePost(id);
    setRefresh(!refresh);
  };
  const chatWithPoster = async (
    id: string,
    post_creator_id: string,
    post_name: string
  ) => {
    const chatId = await createChat("", id, post_name, post_creator_id);
    router.push(`/chat/${chatId}`);
    router.refresh();
  };
  if (posts?.length === 0) {
    return (
      <div>
        <h1 className="mt-8 border border-gray-300 mx-auto w-80 rounded font-bold">
          No Posts Available
        </h1>
      </div>
    );
  } else if (posts === undefined) {
    return <div className="mt-8 font-bold text-blue-500">Loading posts...</div>;
  }
  console.log("posts:", posts)
  return (
    <div>
      <h1 className="mb-8 border border-gray-300 mx-auto w-80 rounded font-bold">
        Latest Posts
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-4 gap-2 mx-auto">
        {posts && posts.map((post: any) => (
          <li key={post.id} className="p-2">
            <Card
              style={{ width: "100%", height: "100%" }}
              className=" mx-auto flex flex-col h-full shadow-md hover:shadow-md dark:hover:shadow-white"
            >
              <div className="mt-auto text-center">
                <CardHeader>
                  {post.image_string !== null &&
                    post.image_string.length > 0 && (
                      <Image
                        width={300}
                        height={300}
                        src={post.image_string[0]}
                        alt="post-image-1"
                        onClick={() => {
                          router.push(`/post/${post.id}`);
                          router.refresh();
                        }}
                        className="mx-auto mb-1"
                        style={{ maxHeight: "300px", maxWidth: "100%" }}
                      />
                    )}
                  <CardTitle
                    onClick={() => {
                      router.push(`/post/${post.id}`);
                      router.refresh();
                    }}
                  >
                    {post.title}
                  </CardTitle>
                  <CardDescription
                    onClick={() => {
                      router.push(`/post/${post.id}`);
                      router.refresh();
                    }}
                  >
                    {post.description}
                  </CardDescription>
                </CardHeader>
              </div>
              <div className="text-right justify-end">
                <CardFooter
                  className="flex justify-end font-thin text-xs"
                  onClick={() => {
                    router.push(`/post/${post.id}`);
                    router.refresh();
                  }}
                >
                  {post.readable_time.substring(0, 24)}
                </CardFooter>
                <CardFooter
                  className="flex justify-end font-thin text-xs"
                  onClick={() => {
                    router.push(`/post/${post.id}`);
                    router.refresh();
                  }}
                >
                  {post.user_name}
                </CardFooter>
              </div>
              <div className="text-center">
                {user?.id === post.user_id && (
                  <Button
                    onClick={() => clickDelete(post.id)}
                    variant="outline"
                    className="mb-2 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                )}
                {user?.id !== undefined && user?.id !== post.user_id && (
                  <Button
                    onClick={() =>
                      chatWithPoster(post.id, post.user_id, post.title)
                    }
                    variant="outline"
                    className="mb-2 hover:bg-blue-500"
                  >
                    Chat
                  </Button>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
// console.log("user in logic", user)
// const currentUserDetails = await checkLoggedIn();
// const posts = await fetchFilteredPosts(query);
//client component inside server component

export default PostServer;
