import React from "react";
import {getAuthOrRedirect} from "@/utils/authUtils";

export default async function AuthenticatedLayout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect()  
  return <>{children}</>
}
