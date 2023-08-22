import GetUsers from "./GetUsers"
import { generateUUID } from "./uuid"

const Register = async (payload: RegisterPayload) : Promise<AppResponse<LoginResponseData>> => {
    let status : number = 201;
    let statusText : string = ""
    let data : LoginResponseData | null = null;

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        const users = usersRes.data
        const user = users.find(user => user.email === payload.email )

        if ( user ) {
            status = 505;
            statusText = "You are signup already please login"

        } else {
            const newUser : User = {
                id: new Date().getTime(),
                email: payload.email,
                password: payload.password,
                birthDate: payload.birthDate,
                creationDate: new Date().getTime(),
                modificationDate: null,
                profileImage: null,
                userName: payload.userName,
                answerdQuestions: []
            }
        
            const res = await fetch(process.env.NEXT_PUBLIC_USERS_API!, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            status = res.status;
            statusText = res.statusText

            if ( res.ok ) {
                data = {
                    token: generateUUID(),
                    user: newUser
                }
            }
        }

    } else {
        status = usersRes.status;
        statusText = usersRes.statusText
    }

    return {
        status,
        statusText,
        data
    }
}


export default Register;