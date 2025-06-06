import React from "react";
import {getAdminOrRedirect} from "@/features/organization/organizationActions";



export default async function AuthLayout({
                                           children, params
                                         }: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    organizationId: string;
  }>
}>) {

  const {organizationId} = await params;
  await getAdminOrRedirect(organizationId)

  return (
    <>
      {children}
    </>
  )
}
