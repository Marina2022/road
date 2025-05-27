import {useEffect, useState} from "react";
import {User as AuthUser} from "lucia/dist/core";
import {usePathname} from "next/navigation";
import {getAuth} from "@/features/auth/authActions";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [fetched, setFetched] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const getUser = async () => {
      const auth = await getAuth()
      const user = auth.user

      setUser(user)
      setFetched(true)
    }

    getUser()

  }, [pathname]);
  
  return {user, fetched}

}

