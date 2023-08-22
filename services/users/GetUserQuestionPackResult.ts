import GetUsers from "./GetUsers";

const GetUserQuestionPackResult = async (id: number) : Promise<AppResponse<QuestionPackResult>>=> {
  let status : number = 201;
  let statusText : string = "Success";
  let data : QuestionPackResult | null = null;

  const usersRes = await GetUsers();

  if ( usersRes.data ) {
    const users = usersRes.data
    const user = users.find(user => user.answerdQuestions.find(result => result.id === id))

    if ( user ) {
      const answer = user.answerdQuestions.find(result => result.id === id)
      data = answer!
    } else {
      status = 404;
      statusText = "Result not found."
    }
    
  } else {
    status = usersRes.status;
    statusText = usersRes.statusText;
  }

  return {
    status,
    statusText,
    data
  }
}

export default GetUserQuestionPackResult;