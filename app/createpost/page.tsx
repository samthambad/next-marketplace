import React, { Suspense } from 'react'
import "@/styles/globals.css"
import Input from '@/components/input'
import { checkLoggedIn } from '@/app/layout';
import {redirect} from 'next/navigation';

const CreatePost = async () => {
  const userDetails = await checkLoggedIn();
  console.log(userDetails);
  //redirect to home page if not logged in
  return (
    <div className='text-center'>
      {userDetails ?
      <div>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4'>Create Post</h1>
        <br className='max-md:hidden mt-4'/>
        <Suspense fallback=<div>Loading...</div> >
          <Input/>
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
  
  export default CreatePost
