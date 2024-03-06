import { fetchFilteredChatsChatId } from "@/lib/actions"
import RealtimeChatDisplay from "./realtimeChatDisplay"

// client component as I want it to periodically refresh
const ChatDisplay = async ({ chatId }: { chatId: string }) => {
  const chats = await fetchFilteredChatsChatId(chatId)
  console.log("chats in chatdisplay:", chats)
  return (
    <RealtimeChatDisplay chats={chats?.[0]} />
  )


}

export default ChatDisplay
