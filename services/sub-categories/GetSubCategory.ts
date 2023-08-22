const GetSubCategory = async (subCategoryId: number) : Promise<AppResponse<SubCategory>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : SubCategory | null = null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUB_CATEGORIES_API}/${subCategoryId}`)

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

export default GetSubCategory;