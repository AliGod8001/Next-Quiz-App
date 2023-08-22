interface authStoreState {
    token: string | null,
    id: number | null,
    setInitialAuth: (token: string, id: number) => void,
    login: (payload: LoginPayload) => Promise<AppResponse<string>>,
    Register: (payload: RegisterPayload) => Promise<AppResponse<string>>,
    LoginHelper: (token: string, user: User) => void,
    logout: () => void
}

interface ThemeStoreState {
    darkMode: boolean,
    setInitialDarkMode: (dark: boolean) => void,
    toggleDarkMode: () => void,
}

interface UserStoreState {
    user: User | null,
    login: (user: User) => void,
    logout: () => void,
    setUser: (payload: UserEditData) => Promise<AppResponse<String>>,
    setScore: (packId: number, result: QuestionPackResult) => Promise<AppResponse<string>>,
}

interface LoginPayload {
    username: string,
    password: string
}

type RegisterPayload = {
    userName: string,
    email: string;
    password: string,
    birthDate: number
}

type LoginResponseData = {
    token: string,
    user: User,
}

type UserEditData = {
    userName: string,
    oldpassword?: string | null,
    newRepassword?: string | null,
    newpassword?: string | null,
    profileImage?: string | null,
    birthDate?: number | null,
}