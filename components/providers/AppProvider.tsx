"use client";
import React, { useEffect, useState } from "react";

import GetUser from "@/services/users/GetUser";

import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import { useUserStore } from "@/store/user-store";
import Loading from "@/components/ui/loading/Loading";
import "@/styles/globals.scss";
import { decrypt } from "@/utils";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [darkMode, setInitialDarkMode] = useThemeStore((state) => [
    state.darkMode,
    state.setInitialDarkMode,
  ]);
  const [token, userId, setInitialAuth] = useAuthStore((state) => [
    state.token,
    state.id,
    state.setInitialAuth,
  ]);
  const login = useUserStore(state => state.login)

  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_THEME_STORE!)) {
      localStorage.setItem(process.env.NEXT_PUBLIC_THEME_STORE!, "false");
    } else {
      const darkModeItem =
        localStorage.getItem(process.env.NEXT_PUBLIC_THEME_STORE!) === "true"
          ? true
          : false;
      setInitialDarkMode(darkModeItem);
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    const fetchUser = async (id: number = userId!) => {
        const usr = await GetUser(id)
        setUser(usr.data!)
    }

    if ( !token ) {
        if ( localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_STORE!) ) {
            const authItem : AuthLocalStorage = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_STORE!)!)
            const currentTime = new Date().getTime()
            const setTime = new Date(authItem.set_at + Number(process.env.NEXT_PUBLIC_AUTH_TOKEN_CREDIT) * 3600000).getTime()

            if ( setTime < currentTime ) {
                localStorage.removeItem(process.env.NEXT_PUBLIC_AUTH_STORE!)
                setUser(null)
            } else {
                setInitialAuth(authItem.token, Number(decrypt(authItem.id)))
            }
        }

        if ( user ) {
            setUser(null)
        }

    }

    if ( token && !user ) {
        fetchUser()
    }

    if ( token && user ) {
        login(user)
    }
    
    setLoading(false)
}, [token, user])

  const themeClass = darkMode ? "dark" : "light";

  return (
    <main className={themeClass}>
      {loading ? <Loading /> : <>{children}</>}
    </main>
  );
};

export default AppProvider;
