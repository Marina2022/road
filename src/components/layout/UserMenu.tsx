'use client'

import React from 'react';
import {signOut} from "@/features/auth/authActions";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import SubmitButton from "@/components/form/SubmitButton";
import {useAuth} from "@/hooks/use-auth";


const UserMenu = () => {

  const {user} = useAuth()
  
  return (
    <div className="min-w-[200px] flex justify-end gap-2">

      {
        !user && <>
          <Link className={buttonVariants({variant: 'outline'})} href="/sign-up">Sign up</Link>
          <Link className={buttonVariants({variant: 'outline'})} href="/sign-in">Sign in</Link>
        </>
      }

      {
        user && <div className="font-bold flex gap-4 items-center"><span>{user.username}</span>
          <form action={signOut}>
            <SubmitButton label="Sign Out"/>
          </form>
        </div>
      }
    </div>
  );
};

export default UserMenu;