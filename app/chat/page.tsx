import React, { Suspense } from 'react'
import { checkLoggedIn } from '../layout';
import { redirect } from 'next/navigation';
import ChatList from './chatList';
export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto';

const Chat = async() => {
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
    <ChatList/>  
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
