"use client";
import Link from 'next/link';
import React from 'react'
import { supabaseBrowser } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


const Navbar = ({user}:{user:User | undefined}) => {
  const router = useRouter();
  const handleLoginWithGoogle = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: location.origin + "/auth/callback",
      }
    });
  }
  const handleLogoutWithGoogle = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <div className='flex items-center justify-center gap-[4vw] mb-10 pt-2 pb-2'>
      <Link href="/" className='hover:text-blue-500 text-white font-bold'>Home</Link>
      <Link href="/search" className='hover:text-blue-500 text-white font-bold'>Search</Link>
      {user && <Link href="/createpost" className='hover:text-blue-500 text-white font-bold'>Create Post</Link>}
      {user && <Link href="/chat" className='hover:text-blue-500 text-white font-bold'>Chats</Link>}
      {user ? <Button onClick={handleLogoutWithGoogle}  variant="outline">Log Out</Button>: <Button onClick={handleLoginWithGoogle}  variant="outline">Log In</Button>}
    </div>
    )
  }
  
  export default Navbar
  
