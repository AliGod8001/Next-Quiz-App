import Link from "next/link";
import Image from "next/image";

import {
  questionBannerImage,
  questionsImage,
  timeImage,
  correctImage,
} from "@/public/images";
import useFormatResult from "@/hooks/use-format-result";
import MainButton from "@/components/ui/button/MainButton";

import styles from "./QuestionStart.module.scss";

const QuestionStart = ({
  onStart,
  title,
  buttonText,
  result,
}: {
  onStart: () => void;
  title?: string;
  buttonText: string;
  result?: QuestionPackResult;
}) => {
  const { time, correctCount } = useFormatResult(result!);

  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.img}
        src={questionBannerImage}
        width={200}
        height={200}
        loading="lazy"
        alt="question page banner image"
      />
      <h2 className={styles.title}>
        Your <span>{`"${title}"`}</span> question are ready
      </h2>
      <div className={styles["box-wrapper"]}>
        <div className={styles.box}>
          <Image
            className={styles["box-img"]}
            src={questionsImage}
            width={50}
            height={50}
            loading="lazy"
            alt="questions image"
          />
          <span className={styles["box-text"]}>
            20 <small>Questions</small>
          </span>
        </div>
        <div className={styles.box}>
          <Image
            className={styles["box-img"]}
            src={timeImage}
            width={50}
            height={50}
            loading="lazy"
            alt="timer image"
          />
          <span className={styles["box-text"]}>
            15 <small>Minutes</small>
          </span>
        </div>
        <div className={styles.box}>
          <Image
            className={styles["box-img"]}
            src={correctImage}
            width={50}
            height={50}
            loading="lazy"
            alt="checked image"
          />
          <span className={styles["box-text"]}>
            10 <small>correct needed</small>
          </span>
        </div>
      </div>
      {result && (
        <div className={styles.result}>
          <div className={styles.item}>
            Point: <span>{result.point}</span>
          </div>
          <div className={styles.item}>
            Time: <span>{time}</span>
          </div>
          <div className={styles.item}>
            Correct: <span>{correctCount}</span>
          </div>
        </div>
      )}
      <div className={styles.actions}>
        <MainButton round onClick={onStart}>
          {buttonText}
        </MainButton>
        {result && (
          <Link href={`/profile/results/${result?.id}`}>
            <MainButton variant="primary-outline" round>
              See Full Result
            </MainButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuestionStart;
