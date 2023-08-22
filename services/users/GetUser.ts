const GetUser = async (userId: number) : Promise<AppResponse<User>> => {
    let status : number = 201;
    let statusText : string = "";
    let data : User | null = null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${userId}`, { cache: "no-cache" })

    if ( res.ok ) {
        data = await res.json()
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

export default GetUser;