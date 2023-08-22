import { create } from 'zustand'

import GetLogin from '@/services/users/GetLogin';
import Register from '@/services/users/Register';
import UserNameCheck from '@/services/users/UserNameCheck';
import { useUserStore } from '@/store/user-store';
import { encrypt } from '@/utils';

const STORAGE_NAME = process.env.NEXT_PUBLIC_AUTH_STORE

const changeAuthLocalStorage = (token: string, id: string) => {
    if ( typeof window !== 'undefined' ) {
        localStorage.setItem(STORAGE_NAME!, JSON.stringify({
            set_at: new Date().getTime(),
            token,
            id,
        }))
    }
}

const removeInitialToken = () => {
    if ( typeof window !== 'undefined' ) {
        localStorage.removeItem(STORAGE_NAME!)
    }
}

export const useAuthStore = create<authStoreState>() ((set) => ({
    token: null,
    id: null,
    setInitialAuth: (token: string, id: number) => {
        set(() => ({
            token,
            id
        }))
    },
    login: async (payload: LoginPayload) => {
        let status: number = 201;
        let statusText : string = "You are logged in Sucessfully"
        let data : string;

        const res = await GetLogin({
            username: payload.username,
            password: payload.password,
        })

        if ( res.status === 201 && res.data ) {
            useAuthStore.getState().LoginHelper(res.data.token, res.data.user)
        }

        if ( res.status !== 201 ) {
            status = res.status;
            statusText = res.statusText;
        }

        return {
            status,
            statusText,
            data: data!
        }
    },
    Register: async (payload: RegisterPayload) => {
        let status: number = 201;
        let statusText: string = "You are registered successfully.";
        let data: string;

        const { status: userNameStatus, statusText: userNameStatusText } = await UserNameCheck(payload.userName)

        if ( userNameStatus === 201 ) {
            const res = await Register({
                userName: payload.userName,
                email: payload.email,
                password: payload.password,
                birthDate: payload.birthDate
            });
    
            if (res.status === 201) {
                useAuthStore.getState().LoginHelper(res.data!.token, res.data!.user);
            }
    
            if (res.status !== 201) {
                status = res.status;
                statusText = res.statusText;
            }
        } else {
            status = userNameStatus;
            statusText = userNameStatusText;
        }


        return {
            status,
            statusText,
            data: data!
        };
    },
    LoginHelper(token: string, user: User) {
        changeAuthLocalStorage(token, encrypt(String(user.id)))
        set(() => ({ token: token, id: user.id }))
        useUserStore.getState().login(user)
    },
    logout: () => {
        removeInitialToken()
        set(() => ({ token: null, id: null }))
        useUserStore.getState().logout()
    }
}))