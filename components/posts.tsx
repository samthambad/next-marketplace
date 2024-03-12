'use client'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { createChat, deletePost } from '@/lib/actions'
import { useRouter } from 'next/navigation'
//interactivity is required soon
const Posts = ({ posts, user }: { posts: any, user: any }) => {
  // make user undefined for conditions below
  if (user === "") user = undefined;
  console.log("user in posts", user)
  const router = useRouter();
  const clickDelete = (id: string) => {
    // server function but works in client component, same for chatWithPoster
    // works as you don't need to use any data from the function
    deletePost(id);
    router.refresh();
  }
  const chatWithPoster = async (id: string, post_creator_id: string, post_name: string) => {
    console.log("chat button pressed")
    const chatId = await createChat("", id, post_name, post_creator_id);
    router.push(`/chat/${chatId}`)
    router.refresh()
  }
  if (!posts) {
    return (
      <div className="font-semibold text-center text-blue-400">Loading...</div>
    )
  }
  return (
    <div>
    <h1 className='mb-8 border border-gray-300 mx-auto w-80 rounded font-bold'>Latest Posts</h1>
    <ul className='mx-auto w-80'>
        {posts?.map((post: any) => (
          <li key={post.id} className='mb-4'>
            <Card className='hover:bg-gray-400' onClick={() => { router.push(`/post/${post.id}`); router.refresh(); }}>
              <CardHeader>
                {post.image_string !== null && <img src={post.image_string[0]}  className='mx-auto mb-1' style={{maxHeight: '300px', maxWidth: '100%'}}></img>}
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter>{post.readable_time}</CardFooter>
              <CardFooter>{post.user_name}</CardFooter>
              {user?.id === post.user_id && <Button onClick={() => clickDelete(post.id)} variant="outline" className='mb-2 hover:bg-red-600'>Delete</Button>}
              {user && user?.id !== post.user_id && <Button onClick={() => chatWithPoster(post.id, post.user_id, post.title)} variant="outline" className='mb-2 hover:bg-blue-500'>Chat</Button>}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts;
