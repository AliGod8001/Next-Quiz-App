import GetUsers from "./GetUsers"
import { generateUUID } from "./uuid"

const GetLogin = async (payload: LoginPayload) : Promise<AppResponse<LoginResponseData>> => {
    let status : number = 201;
    let statusText : string = "";
    let data : LoginResponseData | null = null;

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        const users = usersRes.data
        const userIndex : number = users.findIndex(user => user.userName === payload.username)

        if ( userIndex === -1 ) {
            statusText = "User Not Found..."
            status = 404
        } else {
            const user : User = users[userIndex]

            if ( user.password !== payload.password ) {
                statusText = "Password is wrong"
                status = 404
            } else {
                data = {
                    token: generateUUID(),
                    user: user
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


export default GetLogin;