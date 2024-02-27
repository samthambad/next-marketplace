import React from 'react'
import { checkLoggedIn } from '../layout';
import { redirect } from 'next/navigation';
import ChatList from './chatList';

const Chat = async() => {
  const userDetails = await checkLoggedIn();
  // fetch from allChats all rows that have either p1 or p2 == currentUserId
  return (
    <div>
    {userDetails ?
    <div>
      <div className='flex-center flex-col text-center mx-auto'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mx-auto'> Chat </h1>
      </div>
      <ChatList/>
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
