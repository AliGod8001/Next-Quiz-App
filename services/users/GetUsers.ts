const GetUsers = async () : Promise<AppResponse<User[]>> => {
    let status : number = 201;
    let statusText : string = ""
    let data : User[] | null = null;

    const res = await fetch(process.env.NEXT_PUBLIC_USERS_API!)

    if ( res.ok ) {
        data = await res.json()
    } else {
        status = res.status;
        statusText = res.statusText;
    }

    return {
        status,
        statusText,
        data
    };
}

export default GetUsers;