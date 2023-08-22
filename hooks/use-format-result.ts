import useFormatSecond from "./use-format-second";

const useFormatResult = (result: QuestionPackResult) => {
  const time = useFormatSecond(result.timeElappsed)
  const correctCount = result.answers.reduce((arc, rsl) => {
    return rsl ? arc + 1 : arc
  }, 0)

  return { time, correctCount }
}

export default useFormatResult;