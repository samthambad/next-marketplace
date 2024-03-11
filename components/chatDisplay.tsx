import { fetchFilteredChatsChatId, fetchFilteredPostId, fetchImageString } from "@/lib/actions"
import RealtimeChatDisplay from "./realtimeChatDisplay"
import fetch from 'node-fetch'
import {redirect} from 'next/navigation'
import ChatStatusBar from "./chatStatusBar"
// client component as I want it to periodically refresh
const ChatDisplay = async ({ chatId }: { chatId: string }) => {
  const chats = await fetchFilteredChatsChatId(chatId)
  const { post_id } = chats?.[0];
  const post_details = await fetchFilteredPostId(post_id)
  const { image_string } :{ image_string: string[] }= post_details;
  const image_string_first : string = image_string?.[0]
  const {title}: {title: string}= post_details;

  // console.log("chats in chatdisplay:", chats)
  return (
    <div>
      <ChatStatusBar postTitle={title} image_string_first={image_string_first} postId={ post_id } />
      <RealtimeChatDisplay chats={chats?.[0]} />
    </div>
  )


}

export default ChatDisplay
