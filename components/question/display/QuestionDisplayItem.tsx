import MainCard from "@/components/ui/card/main/MainCard";

import styles from "./QuestionDisplayItem.module.scss";

const QuestionDisplayItem = ({
  answerData,
  onAnswer,
  correctId,
}: {
  answerData: Answers;
  onAnswer: (answerId: number) => void;
  correctId?: number;
}) => {
  const handler = () => {
    onAnswer(answerData.id);
  };
  return (
    <label
      className={styles.item}
      onClick={handler}
      htmlFor={`answer-${answerData.id}`}
    >
      <MainCard className={styles.card}>
        <input
          type="radio"
          name="question-answers"
          id={`answer-${answerData.id}`}
          hidden
        />
        {answerData.answerText}
      </MainCard>
    </label>
  );
};

export default QuestionDisplayItem;
