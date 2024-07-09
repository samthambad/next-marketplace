import React from 'react'
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-white py-4 mt-10 bottom-0 text-center w-full font-sans text-xs'>
      <div>This marketplace was made by Samarth Thambad</div>
      <div className="flex justify-center items-center space-x-4 mt-2">
        <Link href={'mailto:thambad@gmail.com'} className='font-bold hover:text-blue-200 flex items-center'>
          <MdEmail className="mr-1" /> Email
        </Link>
        <Link href={'http://github.com/samthambad'} className='font-bold hover:text-blue-200 flex items-center'>
          <FaGithub className="mr-1" /> GitHub
        </Link>
      </div>
    </footer>
  )
}

export default Footer