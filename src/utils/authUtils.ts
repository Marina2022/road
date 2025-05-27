import {getAuth} from "@/features/auth/authActions";
import { User } from "lucia";
import {redirect} from "next/navigation";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth()
  if (!auth.user) {
    redirect('/sign-in')
  }
  return auth
}



type Entity = {
  userId: string; 
}

export const isOwner = ({user, entity}:  {user: User, entity: Entity}) => {
  
  return entity.userId === user.id
}