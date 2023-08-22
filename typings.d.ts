interface BaseInfo {
    id: number,
    creationDate: number,
    modificationDate: number | null,
}

interface User extends BaseInfo {
    userName: string,
    password: string,
    email: string,
    profileImage: string | null,
    birthDate: number,
    answerdQuestions: QuestionPackResult[]
}

interface MainCategory extends BaseInfo {
    title: string,
    text: string,
    color: string,
    icon: string,
}

interface Category extends BaseInfo {
    mainCategory_id: number,
    title: string,
}

interface SubCategory extends BaseInfo {
    category_id: number,
    title: string,
    time: number,
    passCorrectNumber: number,
    questionPackId: number,
}

interface QuestionPack {
    subCategory_id: number,
    id: number,
    questions: Question[]
}

interface Question {
    id: number,
    title: string,
    answers: Answers[],
    correctId: number
}

interface QuestionPackResult {
    id: number,
    questionPackId: number,
    answers: boolean[],
    point: number,
    timeElappsed: number,
}

interface Answers {
    id: number,
    answerText: string,
}

interface QuestionResult {
    answers: boolean[],
    timePassed: number,
}

interface AuthLocalStorage {
    set_at: number,
    token: string,
    id: string
}

interface AppResponse<T> {
    status: number,
    statusText: string,
    data: T | null
}

type ButtonVariant = "primary" | "primary-outline" | "primary-flat" | "secondary" | "secondary-outline" | "secondary-flat" | "danger"

type ButtonType = "button" | "reset" | "submit"

type PasswordStrength = "very weak" | "weak" | "moderate" | "strong" | "powerfull"