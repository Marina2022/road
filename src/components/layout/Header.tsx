'use client'

import Link from "next/link";
import React, {useEffect, useState} from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import ToggleTheme from './ToggleTheme';
import UserMenu from "@/components/layout/UserMenu";
import {useAuth} from "@/hooks/use-auth";

const Header = () => {

  const {user, fetched} = useAuth()
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // включаем анимацию только после монтирования
    const timeout = setTimeout(() => {
      setShouldAnimate(true)
    }, 300) // маленькая задержка — после гидратации

    return () => clearTimeout(timeout)
  }, [])

  

  if (!fetched) return null

  return (
    <nav className={`flex justify-between p-2 max-w-4/5 mx-auto ${shouldAnimate ? 'animate-header-from-top' : '-translate-y-full'}`}>
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