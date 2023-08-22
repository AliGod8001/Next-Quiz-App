const GetAllCategories = async () : Promise<AppResponse<Category[]>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : Category[] | null = null;
  const res = await fetch(process.env.NEXT_PUBLIC_CATEGORIES_API!)

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

export default GetAllCategories;