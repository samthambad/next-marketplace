import { fetchFilteredChatsChatId } from "@/lib/actions";

export async function POST(req:any, res:any) {
  try {
    const {chatId} = await req.json();
    const chats = await fetchFilteredChatsChatId(chatId)
    const newResponse = new Response(JSON.stringify(chats));
    return newResponse;
  } catch (error) {
    console.log(error)
  }
}
