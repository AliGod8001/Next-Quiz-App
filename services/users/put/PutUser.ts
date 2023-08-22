const PutUser = async (user: User) : Promise<AppResponse<string>> => {
  let status : number = 201
  let statusText : string = "";
  let data : string | null = null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
          "Content-Type": "application/json"
      }
  })

  if ( res.ok ) {
      data = "Success"
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

export default PutUser;