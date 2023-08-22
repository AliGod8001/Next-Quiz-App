const GetMainCategories = async () : Promise<AppResponse<MainCategory[]>> => {
  let status : number = 201;
  let statusText: string = "Success";
  let data : MainCategory[] | null = null;

  const res = await fetch(process.env.NEXT_PUBLIC_MAIN_CATEGORIES_API!)

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

export default GetMainCategories;