import {
  checkLoggedIn,
  fetchFilteredChatsChatId,
  fetchFilteredPostId,
  fetchUserDetails,
} from "@/lib/actions";
import RealtimeChatDisplay from "./realtimeChatDisplay";
import ChatStatusBar from "./chatStatusBar";
import { redirect } from "next/navigation";
// client component as I want it to periodically refresh
const ChatDisplay = async ({ chatId }: { chatId: string }) => {
  const chats = await fetchFilteredChatsChatId(chatId);
  const { post_id } = chats?.[0];
  const post_details = await fetchFilteredPostId(post_id);
  const image_string = post_details?.image_string ?? ""
  let image_string_first: string = "";
  if (image_string !== null) {
    image_string_first = image_string?.[0] ?? "";
  }
  let title = post_details?.title
  if (title === "") title = "post was deleted"
  const userDetails = await checkLoggedIn();
  let otherUserId = ""
  if (userDetails?.id === chats?.[0].p1_id) otherUserId = chats?.[0].p2_id
  else if (userDetails?.id === chats?.[0].p2_id) otherUserId = chats?.[0].p1_id

  const otherUser = await fetchUserDetails(otherUserId)
  // check that either person is logged in
  if (otherUserId.length !== 0) {
    return (
      <div>
        <ChatStatusBar
          postTitle={title}
          image_string_first={image_string_first}
          postId={post_id}
          otherUser={otherUser}
        />
        <RealtimeChatDisplay chats={chats?.[0]} />
      </div>
    );
  } else redirect("/");
};

export default ChatDisplay;
