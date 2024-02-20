import React from 'react'
import "@/styles/globals.css"
import Input from '@/components/input'
import { checkLoggedIn } from '@/app/layout';

const CreatePost = async () => {
  const userDetails = await checkLoggedIn();
  return (
    <div className='text-center'>
      {userDetails ?
      <div>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4'>Create Post</h1>
        <br className='max-md:hidden mt-4'/>
        <Input/>
        </div>
        :
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4'>You are not logged in!</h1>
      }
    </div>
  ) 
  }
  
  export default CreatePost