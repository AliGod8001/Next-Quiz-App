import GetUser from "../GetUser";
import PutUser from "./PutUser";

const PutUserQuestionResult = async (
  userId: number,
  questionPackId: number,
  result: QuestionPackResult
) : Promise<AppResponse<User>> => {
  let status : number = 201;
  let statusText : string = "Success";
  let data : User | null = null;

  const userRes = await GetUser(userId)

  if ( userRes.data ) {
    const user = userRes.data
    const questionResultIndex = user.answerdQuestions.findIndex(question => question.questionPackId === questionPackId)

    if ( questionResultIndex !== -1 ) {
      const questionPack = user.answerdQuestions[questionResultIndex]
      const packCorrect = questionPack.answers.reduce((arc, result) => {
        return result ? arc + 1 : arc
      }, 0)
      const newCorrect = result.answers.reduce((arc, result) => {
        return result ? arc + 1 : arc
      }, 0)

      if ( packCorrect < newCorrect ) {
        questionPack.answers = result.answers;
        questionPack.point = result.point;
        questionPack.timeElappsed = result.timeElappsed;
        user.answerdQuestions[questionResultIndex] = questionPack
      } else {
        statusText = "User Old history had better point"
      }
    } else {
      user.answerdQuestions.push(result)
    }

    user.modificationDate = new Date().getTime()
    const res = await PutUser(user)

    if ( res.data ) {
      data = user;
    } else {
      status = res.status;
      statusText = "Failed to update user result history."
    }

  } else {
    status = userRes.status;
    statusText = userRes.statusText;
  }

  return {
    status,
    statusText,
    data
  }
};

export default PutUserQuestionResult;
