import { create } from 'zustand'

import PutUserInfo from '@/services/users/put/PutUserInfo'
import PutUserQuestionResult from '@/services/users/put/PutUserQuestionResult'

export const useUserStore = create<UserStoreState>() ((set) => ({
    user: null,
    login: (user: User) => {
        set(() => ({
            user
        }))
    },
    logout: () => {
        set(() => ({
            user: null
        }))
    },
    setUser: async (payload: UserEditData) : Promise<AppResponse<string>> => {
        let status : number = 201;
        let statusText : string = "Success";
        let data : string | null = null;

        const { status: userStatus, statusText: userStatusText, data: userData } = await PutUserInfo(useUserStore.getState().user?.id!, payload);

        if ( userData ) {
            set(() => ({ user: userData }))
        } else {
            status = userStatus;
            statusText = userStatusText
        }


        return {
            status,
            statusText,
            data
        }
    },
    setScore: async (packId: number, result: QuestionPackResult) : Promise<AppResponse<string>> => {
        let status : number = 201;
        let statusText : string = "Success";
        let data : string | null = null;

        const res = await PutUserQuestionResult(useUserStore.getState().user?.id!, packId, result)

        if ( res.data ) {
            data = "Success";
            set(() => ({ user: res.data}))
        } else {
            status = res.status;
            statusText = res.statusText
        }

        return {
            status,
            statusText,
            data
        }
    }
}))