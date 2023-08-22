const GetQuestionPack = async (questionPackId: number) : Promise<AppResponse<QuestionPack>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : QuestionPack | null = null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_QUESTION_PACKS_API}/${questionPackId}`)

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
  }
}

export default GetQuestionPack;