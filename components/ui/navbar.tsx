"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ user }: { user: User | undefined }) => {
  const router = useRouter();
  const pathname = usePathname()
  const [toggleDropdown, setToggleDropDown] = useState(false);
  const handleLoginWithGoogle = () => {
    console.log("logging in...");
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  const handleLogoutWithGoogle = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <div className="mx-2 flex items-center justify-center gap-[4vw] mb-10 pt-2">
      <Link href="/" className="transition duration-200 ease-in-out hover:scale-105  font-bold">
        Home
      </Link>
      <Link href="/search" className={`transition duration-200 ease-in-out hover:scale-105 font-bold ${pathname.includes("/search") && "border-b-2 border-slate-700"}`}>
        Search
      </Link>
      <div className="hidden sm:gap-[4vw] sm:flex sm:items-center sm:justify-center">
        {user && (
          <Link href="/createpost" className={`transition duration-200 ease-in-out hover:scale-105 font-bold ${pathname.includes("/createpost") && "border-b-2 border-slate-700"}`}>
            Create Post
          </Link>
        )}
        {user && (
          <Link href="/chat" className={`transition duration-200 ease-in-out hover:scale-105 font-bold ${pathname.includes("/chat") && "border-b-2 border-slate-700"}`}>
            Chats
          </Link>
        )}
        <Link
          href={`/profile/${user?.id}`}
          className={`font-bold transition duration-200 ease-in-out hover:scale-105 ${pathname.includes("/profile") && "border-b-2 border-slate-700"}`}
        >
          {user?.user_metadata.name}
        </Link>
        {user ? (
          <Button
            onClick={handleLogoutWithGoogle}
            variant="outline"
            className="font-bold"
          >
            Log Out
          </Button>
        ) : (
          <Button onClick={handleLoginWithGoogle} variant="outline">
            Log In
          </Button>
        )}
      </div>
      <div className="sm:hidden flex relative">
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RxHamburgerMenu className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900">
              {user ? (
                <>
                  <Link href={`/profile/${user?.id}`}>
                    <DropdownMenuItem className="text-white">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href={"/chat"}>
                    <DropdownMenuItem className="text-white">
                      Chats
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="text-white"
                    onClick={handleLogoutWithGoogle}
                  >
                    Log Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  className="text-white"
                  onClick={handleLoginWithGoogle}
                >
                  Log In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
