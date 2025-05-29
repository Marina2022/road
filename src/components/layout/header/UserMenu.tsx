import React from 'react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {User} from 'lucia';
import AccountDropdown from '@/features/account/account-dropdown';


const UserMenu = ({user}:{user: User | null}) => {
  return (
    <div className="flex justify-end gap-2">

      {
        !user && <>
          <Link className={buttonVariants({variant: 'outline'})} href="/sign-up">Sign up</Link>
          <Link className={buttonVariants({variant: 'outline'})} href="/sign-in">Sign in</Link>
        </>
      }

      {
        user && <AccountDropdown user={user} />
        
        
        // <div className="font-bold flex gap-4 items-center"><span>{user.username}</span>
        //   <form action={signOut}>
        //     <SubmitButton label="Sign Out"/>
        //   </form>
        // </div>
      }
    </div>
  );
};

export default UserMenu;