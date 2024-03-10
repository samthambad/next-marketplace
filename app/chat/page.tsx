import React, { Suspense } from 'react'
import { checkLoggedIn } from '../layout';
import { redirect } from 'next/navigation';
import ChatList from '../../components/chatList';
import { fetchFilteredChatsUserId, fetchImageString, fetchUserDetails } from '@/lib/actions';
export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto';

export interface Chat {
  title: string;
  latest_message: any;
  other_name: string;
  chat_id: number;
  image_string?: string;
}
const Chat = async() => {
  async function getData() {
    const userDetails = await checkLoggedIn();
    const user_id = userDetails?.id ?? ""
    const rawData = await fetchFilteredChatsUserId(user_id);
    let otherName:string = ""
    let other_id = "";
    let arrayOfChats:Chat[] = []
    if (user_id.length > 0) {
      const promiseArray = rawData?.map(async (chat) => {
        // get the name from auth
        if (chat.p1_id === user_id) {
          const otherUserDetails = await fetchUserDetails(chat.p2_id);
          // console.log("otherUserDetails", otherUserDetails?.user.email)
          otherName = otherUserDetails?.user.user_metadata.name;
        } else if (chat.p2_id === user_id) {
          const otherUserDetails = await fetchUserDetails(chat.p1_id);
          // console.log("otherUserDetails if p2 is same as current user", otherUserDetails?.user.email)
          otherName = otherUserDetails?.user.user_metadata.name;
        }
        console.log("name", otherName)
        // make sure the chats with all blanks are not displayed
        let i = chat.messages.length - 1;
        console.log("chat messagess",i)
        for (i; i >= 0; i--) {
          if (chat.messages[i].message !== "") {
            break;
          }
        }
        if (i >= 0) {
          arrayOfChats.push({
            title: chat.post_name,
            latest_message: chat.messages[i].message,
            other_name: otherName,
            chat_id:chat.id,
            image_string: await fetchImage(chat.post_id)
          })
        }
      })
      await Promise.all(promiseArray) //wait for all the promises to  resolve
      return arrayOfChats;
    }
  }
  
  const fetchImage = async (post_id:string) => {
    const image_string = await fetchImageString(post_id);
    console.log("image_string", image_string)
    return image_string;
  }
  const fetchedChatArray:Chat[] = (await getData()) ?? [];
  if (fetchedChatArray.length == 0) {
    return <h1 className='text-center font-extrabold  mb-8 mx-auto'>No Chats found.</h1>
  }
  const userDetails = await checkLoggedIn();
  // fetch from allChats all rows that have either p1 or p2 == currentUserId
  return (
    <div className='text-center'>
    {userDetails ?
    <div className='text-center'>
      <div className='flex-center flex-col text-center mx-auto'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mx-auto'> Chat </h1>
      </div>
    <br />
    <Suspense fallback=<div>Loading...</div> >
      <ChatList data={fetchedChatArray} />  
    </Suspense>
    </div>
      :
      <>
        {redirect('/')}
      </>
    }
    </div>
    )
}

export default Chat
