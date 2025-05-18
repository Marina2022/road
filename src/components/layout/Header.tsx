import Link from "next/link";
import React from 'react';
import {Button, buttonVariants} from "@/components/ui/button";
import ToggleTheme from './ToggleTheme';

const Header = () => {
  return (
    <nav className="flex justify-between p-2 max-w-4/5 mx-auto ">
      <Button asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
      <div className="flex gap-4 items-center">
        <ToggleTheme />
        <Link className={buttonVariants({variant: 'outline'})} href="/tickets">Tickets</Link>  
      </div>      
    </nav>
  );
};

export default Header;