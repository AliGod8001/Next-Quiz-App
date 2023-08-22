"use client"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

import { useAuthStore } from "@/store/auth-store"

const UserBoundryProvider = ({
  children,
} : {
  children: React.ReactNode,
}) => {
  const path = usePathname()
  const router = useRouter()

  const token = useAuthStore(state => state.token)

  useEffect(() => {
    if ( !token ) router.push(`/auth/login?returnUrl=${path.replaceAll("/", "%2F")}`)
  }, [])  

  return <>{children}</>
}

export default UserBoundryProvider;