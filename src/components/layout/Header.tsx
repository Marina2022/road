'use client'

import Link from "next/link";
import React from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import ToggleTheme from './ToggleTheme';
import UserMenu from "@/components/layout/UserMenu";
import {useAuth} from "@/hooks/use-auth";

const Header = () => {


  const {user, fetched} = useAuth()

  if (!fetched) return null

  return (
    <nav className="flex justify-between p-2 max-w-4/5 mx-auto animate-header-from-top">
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
      <div className="flex gap-2 items-center">
        <ToggleTheme/>
        <Link className={buttonVariants({variant: 'default'})} href="/tickets">Tickets</Link>
        <UserMenu user={user}/>
      </div>
    </nav>
  );
};

export default Header;