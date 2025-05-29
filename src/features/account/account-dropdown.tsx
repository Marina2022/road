'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {User} from 'lucia';
import React from 'react';
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from 'next/link';
import {LucideLock, LucideLogOut, LucideUser} from "lucide-react";
import {signOut} from "@/features/auth/authActions";
import SubmitButton from "@/components/form/SubmitButton";

const AccountDropdown = ({user}: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/*<AvatarImage src="https://github.com/shadcn.png"/>*/}
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild>
          <Link href="/account/profile" className="flex gap-2 items-center">
            <LucideUser className="mr-2 h-4 2-4"/>
            <span>Profile</span>
          </Link>

        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/password" className="flex gap-2 items-center">
            <LucideLock className="mr-2 h-4 2-4"/>
            <span>Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault(); // 👈 предотвратить закрытие
          }}
        >          
          <form action={signOut} className="flex items-center">
            <LucideLogOut className="mr-2 h-4 2-4"/> <SubmitButton label="Sign Out" variant="ghost" className="p-0 cursor-pointer"/>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown;