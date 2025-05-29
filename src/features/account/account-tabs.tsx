'use client'

import React from 'react';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from "next/navigation";

const AccountTabs = ({defaultValue}:{defaultValue: string}) => {
  const router = useRouter();
  
  return (
    <Tabs defaultValue={defaultValue} className="w-[400px] mb-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger  onClick={()=>router.push('/account/profile')} value="profile">Profile</TabsTrigger>
        <TabsTrigger onClick={()=>router.push('/account/password')} value="password">Password</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AccountTabs;