import GetUsers from "./GetUsers"

const UserNameCheck = async (userName: string, userId?: number) : Promise<AppResponse<string>> => {
    let status : number = 201
    let statusText  : string = ""
    let data   : string  | null = null

    const usersRes = await GetUsers()

    if ( usersRes.data ) {
        let users : User[] = usersRes.data
        if ( userId ) users = users.filter(user => user.id !== userId)
    
        const userNameFound = users.findIndex(user => user.userName === userName)
    
        if ( userNameFound !== -1 ) {
            status = 202
            statusText = "User Name Has Been Found, Please Pick Another one."
        } else {
            data = "Success"
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

export default UserNameCheck;