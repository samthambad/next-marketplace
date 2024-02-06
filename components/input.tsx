import { createPost } from '@/app/lib/actions'
import React from 'react'

const Input = () => {
  return (
    <div>
      <form action={createPost} className='border border-gray-300 p-4 rounded-lg w-4/5 mx-auto'>
        <input className='border border-gray-300 p-2 rounded-md block mb-4 mx-auto' type='text' name="title" placeholder="Enter title..."></input>  
        <textarea className='border border-gray-300 p-2 rounded-md block mb-4 mx-auto w-4/5' name='description' placeholder="Enter description..."></textarea>  
        <input type="submit" placeholder='Submit' className='border border-gray-300 p-2 rounded-md hover:bg-blue-400 mx-auto block' />
      </form>
    </div>
    )
}

export default Input