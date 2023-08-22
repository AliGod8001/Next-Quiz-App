import { useState, useEffect } from "react";

import MainCard from "@/components/ui/card/main/MainCard";

import styles from "./QuestionCounter.module.scss";

const QuestionCounter = ({ onEndCounter }: { onEndCounter: () => void }) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter > 3) {
      onEndCounter();
      return;
    }

    const interval = setInterval(() => {
      setCounter((prevState) => {
        return prevState + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return <MainCard className={styles.wrapper}>{counter}</MainCard>;
};

export default QuestionCounter;
