import React from 'react'
import "@/styles/globals.css"
import Input from '@/components/input'

const CreatePost = () => {
  return (
    <div className='text-center'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4'>Create Post</h1>
      <br className='max-md:hidden mt-4'/>
      <Input/>
    </div>
  ) 
  }
  
  export default CreatePost