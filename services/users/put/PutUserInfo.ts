import GetUser from "../GetUser"
import PutUser from "./PutUser"
import UserNameCheck from "../UserNameCheck"

const PutUserInfo = async (userId: number, info: UserEditData) : Promise<AppResponse<User>> => {
    let status : number = 201
    let statusText  : string = ""
    let data   : User | null = null

    const userRes = await GetUser(userId)

    if ( userRes.data ) {
        const user = userRes.data;

        user.birthDate    = info.birthDate    ? info.birthDate    : user.birthDate
        user.profileImage = info.profileImage ? info.profileImage : user.profileImage
        user.modificationDate = new Date().getTime()
        if ( info.userName !== user.userName ) {
            const res = await UserNameCheck(info.userName, user.id)
            if ( res.status === 201 ) {
                user.userName = info.userName
            } else {
                return {
                    status: 407,
                    statusText: "This user name has been taken already, please choose another one.",
                    data: null,
                }
            }
        }

        if ( info.oldpassword || info.newpassword || info.newRepassword ) {
            if ( info.oldpassword && !info.newpassword || info.oldpassword && !info.newRepassword ) {
                return {
                    status: 408,
                    statusText: "New password and repaet of that is required.",
                    data: null
                }
            }

            if ( info.newRepassword && info.newRepassword && !info.oldpassword ) {
                return {
                    status: 409,
                    statusText: "Old password is required.",
                    data: null
                }
            }

            if ( info.oldpassword && info.newRepassword && info.newpassword && info.newpassword !== info.newRepassword ) {
                return {
                    status: 410,
                    statusText: "New password and repeat of that is not the same",
                    data: null
                }
            }

            if ( info.oldpassword === user.password ) {
                user.password = info.newpassword!
            } else {
                return {
                    status: 406,
                    statusText: "Your Password is wrong.",
                    data: null
                }
            }
        }

        const res = await PutUser(user)

        if ( res.data ) {
            data = user
        } else {
            status = res.status;
            statusText  = res.statusText 
        }
    } else {
        status = userRes.status;
        statusText = userRes.statusText
    }



    return {
        status,
        statusText,
        data
    }
}

export default PutUserInfo;