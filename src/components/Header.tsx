// src/components/Header.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt="Netflix Logo"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <p className="hidden h-6 w-6 sm:inline">🔍</p>
        <p>Kids</p>
        <p className="h-6 w-6">🔔</p>

        {session ? (
          <img
            onClick={() => signOut()}
            src={session.user?.image || "https://rb.gy/g1pwyx"}
            alt="Account"
            className="cursor-pointer rounded"
          />
        ) : (
          <Link href="/signin">
            <span className="headerLink">Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
