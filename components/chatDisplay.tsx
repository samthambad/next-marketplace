import { fetchFilteredChatsChatId, fetchFilteredPostId, fetchImageString } from "@/lib/actions"
import RealtimeChatDisplay from "./realtimeChatDisplay"
import { redirect } from "next/dist/server/api-utils";
// client component as I want it to periodically refresh
const ChatDisplay = async ({ chatId }: { chatId: string }) => {
  const chats = await fetchFilteredChatsChatId(chatId)
  const { post_id } = chats?.[0];
  const post_details = await fetchFilteredPostId(post_id)
  const { image_string } = post_details;
  const image_string_first = image_string?.[0]
  const {title} = post_details;

  // console.log("chats in chatdisplay:", chats)
  return (
    <div>
      <div className='flex p-2 items-center w-[50%] justify-between gap-[2vw] mb-10 pt-2 pb-2 border rounded mx-auto'>
        <span className="font-bold">{title}</span>
        <img src={image_string_first} style={{maxWidth: '100px', maxHeight:'100px'}} onClick={redirect(`/post/${post_id}`)}></img>
      </div>
    <RealtimeChatDisplay chats={chats?.[0]} />
    </div>
  )


}

export default ChatDisplay
