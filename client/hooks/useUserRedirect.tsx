"use client";
import { useUserContext } from "@/context/userContext.js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.email) {
      router.push(redirect);
    }

    // watch for changes in the user, redirect, router
  }, [user, redirect, router]);
};

export default useRedirect;
