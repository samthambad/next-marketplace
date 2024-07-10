"use client";
import Link from "next/link";
import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./dark-mode-toggle";
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
      <Link href="/" className="hover:text-blue-500  font-bold">
        Home
      </Link>
      <Link href="/search" className={`hover:text-blue-500 font-bold ${pathname.includes("vercel.app/search") ? "text-blue-500": ""}`}>
        Search
      </Link>
      <div className="hidden sm:gap-[4vw] sm:flex sm:items-center sm:justify-center">
        {user && (
          <Link href="/createpost" className={`hover:text-blue-500 font-bold ${pathname.includes("vercel.app/createpost") ? "text-blue-500": ""}`}>
            Create Post
          </Link>
        )}
        {user && (
          <Link href="/chat" className={`hover:text-blue-500 font-bold ${pathname.includes("vercel.app/chat") ? "text-blue-500": ""}`}>
            Chats
          </Link>
        )}
        <Link
          href={`/profile/${user?.id}`}
          className="font-bold hover:text-blue-500"
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
              <Image
                src={"/menu.png"}
                alt="dropdown"
                width={37}
                height={100}
                onClick={() => setToggleDropDown(!toggleDropdown)}
              />
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
      <ModeToggle />
    </div>
  );
};

export default Navbar;
