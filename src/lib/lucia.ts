import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import {Lucia} from "lucia";
import {prisma} from './prismaClient'


const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attrubuts)=>({
    username: attrubuts?.username,
    email: attrubuts?.email,
  })
}) 

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
  email: string;
}