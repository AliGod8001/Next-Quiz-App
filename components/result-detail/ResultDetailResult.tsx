import useFormatResult from '@/hooks/use-format-result';

import styles from './ResultDetailResult.module.scss'

const ResultDetailResult = ({
  result,
}: {
  result?: QuestionPackResult;
}) => {
  const { time, correctCount } = useFormatResult(result!)

  return <div>
    <div className={styles.title}>Your Answerd Result of Questoins:</div>
    <div className={styles.result}>
      <div className={styles['result-item']}>Point: <span>{result?.point}</span></div>
      <div className={styles['result-item']}>Correct: <span>{correctCount}</span></div>
      <div className={styles['result-item']}>Time: <span>{time}</span></div>
    </div>
  </div>;
};

export default ResultDetailResult;
