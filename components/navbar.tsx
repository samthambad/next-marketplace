"use client";
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <nav className="block w-full justify-center mb-16 pt-3 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className='flex items-center justify-center gap-[4vw]'>
          <Link href="/" className='hover:text-blue-500'> Home</Link>
          <Link href="/search" className='hover:text-blue-500'>Search</Link>
          <Link href="/createpost" className='hover:blue-gray-500'>Create Post</Link>
      </div>
    </nav>
  )
}

export default Navbar
