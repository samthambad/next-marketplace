import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-white py-4 mt-10 bottom-0 text-center w-full font-sans'>
      <div> This marketplace was made by Samarth Thambad</div>
      <Link href={'mailto:thambad@gmail.com'} className='font-bold hover:text-blue-200'>Contact</Link>
      <span> | </span>
      <Link href={'http://github.com/samthambad'} className='font-bold hover:text-blue-200'>GitHub</Link>
    </footer>
  )
}

export default Footer
