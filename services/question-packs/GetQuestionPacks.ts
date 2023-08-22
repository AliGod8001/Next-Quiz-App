import GetAllQuestionPacks from "./GetAllQuestionPacks";

const GetQuestionPacks = async (subCategoryId: number) : Promise<AppResponse<QuestionPack[]>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : QuestionPack[] | null = null;

  const qRes = await GetAllQuestionPacks()

  if ( qRes.data ) {
    const questionPacks = qRes.data.filter(question => question.subCategory_id === subCategoryId)

    if ( questionPacks ) {
      data = questionPacks
    } else {
      status = 404
      statusText = "Question Packs Not Found."
    }

  } else {
    status = qRes.status,
    statusText = qRes.statusText
  }

  return {
    status,
    statusText,
    data
  }
}

export default GetQuestionPacks;