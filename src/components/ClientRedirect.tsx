'use client'

import {useRouter} from "next/router";
import {useEffect} from "react";

const ClientRedirect = ({ path }:{path: string}) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(path);
  }, [path, router]);

  return null;
};

export default ClientRedirect