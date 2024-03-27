import { redirect } from "next/navigation";
import ChatList from "../../components/chatList";
import {
  checkLoggedIn,
  fetchFilteredChatsUserId,
  fetchImageString,
  fetchUserDetails,
} from "@/lib/actions";
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const Chat = async () => {
  async function getData() {
    const userDetails = await checkLoggedIn();
    const user_id = userDetails?.id ?? "";
    const rawData = await fetchFilteredChatsUserId(user_id);
    let otherName: string = "";
    let other_id = "";
    let arrayOfChats: any[] = [];
    if (user_id.length > 0) {
      const promiseArray = rawData?.map(async (chat) => {
        // get the name from auth
        if (chat.p1_id === user_id) {
          const otherUserDetails = await fetchUserDetails(chat.p2_id);
          otherName = otherUserDetails?.user.user_metadata.name;
        } else if (chat.p2_id === user_id) {
          const otherUserDetails = await fetchUserDetails(chat.p1_id);
          otherName = otherUserDetails?.user.user_metadata.name;
        }
        console.log("name", otherName);
        // make sure the chats with all blanks are not displayed
        let i = chat.messages.length - 1;
        console.log("chat messagess", i);
        for (i; i >= 0; i--) {
          if (chat.messages[i].message !== "") {
            break;
          }
        }
        if (i >= 0) {
          arrayOfChats.push({
            title: chat.post_name,
            latest_message: chat.messages[i].message,
            latest_message_time: chat.messages[i].readable_time ?? "",
            time: chat.messages[i].time ?? 0,
            other_name: otherName,
            chat_id: chat.id,
            image_string: await fetchImage(chat.post_id),
          });
        }
      });
      const promises = promiseArray ?? []; //make sure it is always an array
      await Promise.all(promises); //wait for all the promises to  resolve
      arrayOfChats.sort((a,b) => (a.time > b.time) ? -1: ((b.time > a.time) ? 1 : 0))
      return arrayOfChats;
    }
  }

  const fetchImage = async (post_id: string) => {
    const image_string = await fetchImageString(post_id);
    console.log("image_string", image_string);
    return image_string;
  };
  const fetchedChatArray = (await getData()) ?? [];
  const userDetails = await checkLoggedIn();
  // fetch from allChats all rows that have either p1 or p2 == currentUserId
  return (
    <div className="text-center">
      {userDetails ? (
        <div className="text-center">
          <div className="flex-center flex-col text-center mx-auto">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mx-auto">
              {" "}
              Chats{" "}
            </h1>
          </div>
          <br />
          <ChatList data={fetchedChatArray} />
        </div>
      ) : (
        <>{redirect("/")}</>
      )}
    </div>
  );
};

export default Chat;
