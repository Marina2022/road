'use client'

import {useEffect} from 'react';
import {toast} from "sonner";
import {deleteCookie, getCookie} from "@/actions/cookies";
import {usePathname} from "next/navigation";

const RedirectToaster = () => {

  const pathname = usePathname()

  useEffect(() => {

    const handleCookie = async (): Promise<void> => {
      const toastMessage = await getCookie({key: 'toast'})

      if (!toastMessage) return

      if (toastMessage) {
        toast.success(toastMessage.value)
        await deleteCookie({key: 'toast'})
      }
    }

    handleCookie()
  }, [pathname]);

  return null
};

export default RedirectToaster;