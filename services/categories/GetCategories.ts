import GetAllCategories from "./GetAllCategories";

const GetCategories = async (mainCategoryId: number) : Promise<AppResponse<Category[]>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : Category[] | null = null;
  const catRes = await GetAllCategories()

  if ( catRes.data ) {
    const categories = catRes.data.filter(category => category.mainCategory_id === mainCategoryId)

    if ( categories.length ) {
      data = categories
    } else {
      status = 404;
      statusText = "Category Not Found"
    }
  } else {
    status = catRes.status;
    statusText = catRes.statusText
  }

  return {
    status,
    statusText,
    data
  }
}

export default GetCategories;