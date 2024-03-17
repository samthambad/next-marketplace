import {
  checkLoggedIn,
  fetchFilteredChatsChatId,
  fetchFilteredPostId,
} from "@/lib/actions";
import RealtimeChatDisplay from "./realtimeChatDisplay";
import ChatStatusBar from "./chatStatusBar";
import { redirect } from "next/navigation";
// client component as I want it to periodically refresh
const ChatDisplay = async ({ chatId }: { chatId: string }) => {
  const chats = await fetchFilteredChatsChatId(chatId);
  const { post_id } = chats?.[0];
  const post_details = await fetchFilteredPostId(post_id);
  console.log("post_details:", post_details);
  const { image_string }: { image_string: string[] } = post_details;
  let image_string_first: string = "";
  if (image_string !== null) {
    image_string_first = image_string[0];
  }
  const { title }: { title: string } = post_details;

  const userDetails = await checkLoggedIn();
  // check that either person is logged in
  if (
    userDetails?.id === chats?.[0].p1_id ||
    userDetails?.id === chats?.[0].p2_id
  ) {
    return (
      <div>
        <ChatStatusBar
          postTitle={title}
          image_string_first={image_string_first}
          postId={post_id}
        />
        <RealtimeChatDisplay chats={chats?.[0]} />
      </div>
    );
  } else redirect("/");
};

export default ChatDisplay;
