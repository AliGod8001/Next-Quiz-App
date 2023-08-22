import { useState, useEffect, useCallback } from "react";

import useShuffle from "@/hooks/use-shuffle";
import MainButton from "@/components/ui/button/MainButton";
import MainCard from "@/components/ui/card/main/MainCard";

import QuestionDisplayItem from "./QuestionDisplayItem";
import styles from "./QuestionDisplay.module.scss";

const QuestionDisplay = ({
  question,
  index,
  onSubmitAnswer,
}: {
  question: Question;
  index: number;
  onSubmitAnswer: (status: boolean) => void;
}) => {
  const [answer, setAnswer] = useState<number>(-1);
  const { array: answers, setNewArray: setNewAnswers } = useShuffle<Answers>(
    question.answers
  );

  const submitAnswerClickHandler = () => {
    onSubmitAnswer(answer === question.correctId);
  };

  const answerClickHandler = (answerId: number) => {
    setAnswer(answerId);
  };

  useEffect(() => {
    setNewAnswers(question.answers);
  }, [question]);

  return (
    <div className={styles.wrapper}>
      <MainCard className={styles.header}>
          <div>{question.title}</div>
          <div className={styles["header-info"]}>
            {index + 1}
            <small>/20</small>
          </div>
      </MainCard>
      <div className={styles.answers}>
        {answers.map((answ) => (
          <QuestionDisplayItem
            onAnswer={answerClickHandler}
            key={answ.id}
            answerData={answ}
          />
        ))}
      </div>
      <MainButton
        className={styles.button}
        onClick={submitAnswerClickHandler}
        disabled={answer === -1}
      >
        Submit
      </MainButton>
    </div>
  );
};

export default QuestionDisplay;
