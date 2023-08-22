"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { useUserStore } from "@/store/user-store";
import NotFound from "@/components/ui/not-found/NotFound";
import Title from "@/components/ui/title/Title";

import QuestionStart from "./QuestionStart";
import QuestionCounter from "./QuestionCounter";
import QuestionResult from "./QuestionResult";
import QuestionDisplay from "./display/QuestionDisplay";
import styles from "./Question.module.scss";

const Question = ({
  pack,
  title,
}: {
  pack: QuestionPack | null;
  title?: string;
}) => {
  const path = usePathname();
  const router = useRouter();
  const actions = path.split("/");

  const user = useUserStore((state) => state.user);

  const [startClicked, setStartClicked] = useState<boolean>(false);
  const [counterEnd, setCounterEnd] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const question = pack?.questions[
    questionNumber > 19 ? 19 : questionNumber
  ] as Question;
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questionpackResult = user?.answerdQuestions.find(answers => answers.questionPackId === pack?.id)

  const startClickHandler = () => {
    if (user) {
      if (!startClicked) {
        setStartClicked(true);
      }
    } else {
      router.push(`/auth/login?returnUrl=${path.replaceAll("/", "%2F")}`);
    }
  };

  const answerSubmitHandler = (status: boolean) => {
    if (questionNumber < 19) {
      setQuestionNumber((prevState) => {
        return prevState + 1;
      });
    }
    if (questionNumber === 19) {
      setStartTime((prevState) => {
        return new Date().getTime() - prevState;
      });
      setQuestionNumber(20);
    }
    setAnswers((prevState) => {
      return [...prevState, status];
    });
  };

  const endCounterHandler = () => {
    setCounterEnd(true);
    setStartTime(new Date().getTime());
  };

  const playAgainClickHandler = () => {
    setStartClicked(true)
    setCounterEnd(false)
    setStartTime(new Date().getTime())
    setQuestionNumber(0)
    setAnswers([])
  }

  return (
    <div className={styles.wrapper}>
      <Title
        href={actions.slice(0, actions.length - 1).join("/")}
        linkText="Back"
      >
        {title} Questions
      </Title>
      {pack ? (
        startClicked ? (
          !counterEnd ? (
            <QuestionCounter onEndCounter={endCounterHandler} />
          ) : questionNumber < 20 ? (
            <QuestionDisplay
              index={questionNumber}
              question={question}
              onSubmitAnswer={answerSubmitHandler}
            />
          ) : (
            <QuestionResult
              result={{
                answers,
                timePassed: startTime,
              }}
              packId={pack.id}
              onPlayAgain={playAgainClickHandler}
            />
          )
        ) : (
          <QuestionStart
            onStart={startClickHandler}
            title={title}
            buttonText={user ? questionpackResult ? "Start Again" : "Start Now" : "Login First"}
            result={questionpackResult}
          />
        )
      ) : (
        <NotFound>Question Pack</NotFound>
      )}
    </div>
  );
};

export default Question;
