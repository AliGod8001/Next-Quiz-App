import { Steps } from "antd";

const ResultDetailResultStep = ({
  result,
  pack,
}: {
  result?: QuestionPackResult;
  pack?: QuestionPack;
}) => {
  const items = pack?.questions.map((question, index) => {
    return {
      title: question.title,
      status: result?.answers[index] ? "finish" : "error"
    }
  })

  return (
    <Steps
      current={result?.answers.length}
      status={result?.answers.at(-1) ? "finish" : "error"}
      progressDot
      direction="vertical"
      items={items as any}
    />
  );
};

export default ResultDetailResultStep;
