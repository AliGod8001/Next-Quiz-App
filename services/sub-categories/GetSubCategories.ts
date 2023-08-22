import GetAllSubCategories from './GetAllSubCategories';

const GetSubCategories = async (categoryId: number) : Promise<AppResponse<SubCategory[]>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : SubCategory[] | null = null;

  const catRes = await GetAllSubCategories()

  if ( catRes.data ) {
    const subCategories = catRes.data.filter(subC => subC.category_id === categoryId)

    if ( subCategories ) {
      data = subCategories
    } else {
      status = 404;
      statusText = "Sub Categories Not Found";
    }

  } else {
    status = catRes.status
    statusText = catRes.statusText
  }

  return {
    status,
    statusText,
    data
  }
}

export default GetSubCategories;