import { useRouter, usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { message } from "antd";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { useAuthStore } from "@/store/auth-store";
import { useUserStore } from "@/store/user-store";
import { starImage, trophyImage } from "@/public/images";
import useFormatSecond from "@/hooks/use-format-second";
import MainButton from "@/components/ui/button/MainButton";
import MainCard from "@/components/ui/card/main/MainCard";

import styles from "./QuestionResult.module.scss";

type ResultType = "weak" | "good" | "perfect";

type ResultContent = {
  starLength: number;
  point: number;
  correct: number;
  image: StaticImageData | string;
  title: string;
  text: string;
  isConfetti: boolean;
};

type ResultText = {
  type: ResultType;
  title: string;
  text: string;
};

const RESULT_TEXT: ResultText[] = [
  {
    type: "weak",
    title: "Your performance at the Weak Level.",
    text: " shows room for improvement. Don't be discouraged, though! With a bit more practice and study, you can strengthen your knowledge and achieve even better results.",
  },
  {
    type: "good",
    title: "Congratulations!",
    text: "Your performance at the Good Level demonstrates a solid understanding of the material. Keep up the good work, and continue refining your skills to reach even greater heights.",
  },
  {
    type: "perfect",
    title: "Incredible job!",
    text: "Your performance at the Perfect Level is outstanding. You've showcased a comprehensive mastery of the content. Keep pushing your boundaries and aiming for excellence in all your future endeavors.",
  },
];

const calcResult = (result: QuestionResult): ResultContent => {
  const correctCount = result.answers.reduce((arc, result) => {
    return result ? arc + 1 : arc;
  }, 0);
  let point: number = 0;
  const passedTimeSeconds = Math.round(result.timePassed / 1000);

  if (correctCount <= 5) {
    point += 0;
  } else if (correctCount <= 10) {
    point += 1;
  } else if (correctCount <= 17) {
    point += 2;
  } else {
    point += 3;
  }

  if (passedTimeSeconds < 300) {
    point += 2;
  } else if (passedTimeSeconds < 600) {
    point += 1;
  }

  const res = RESULT_TEXT.find(
    (res) =>
      res.type === (point <= 2 ? "weak" : point <= 4 ? "good" : "perfect")
  );

  return {
    starLength: point,
    point,
    correct: correctCount,
    image: trophyImage,
    isConfetti: point >= 3,
    title: res?.title as string,
    text: res?.text as string,
  };
};

const QuestionResult = ({
  result,
  onPlayAgain,
  packId,
}: {
  result: QuestionResult;
  onPlayAgain: () => void;
  packId: number;
}) => {
  const path = usePathname();
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const setScore = useUserStore((state) => state.setScore);

  const [messageApi, contextHolder] = message.useMessage();

  const id = new Date().getTime();
  const content = calcResult(result);
  const stars = new Array(content.starLength).fill(5);
  const timeElapsed = useFormatSecond(Math.round(result.timePassed / 1000));
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (token) {
      const packResult: QuestionPackResult = {
        id,
        answers: result.answers,
        point: content.point,
        questionPackId: packId,
        timeElappsed: Math.round(result.timePassed / 1000),
      };
      setScore(packId, packResult)
        .then((data) => {
          if (data.data)
            messageApi.open({
              type: "success",
              content: "Your Result History Was Updated",
            });
        })
        .catch((err: Error) => {
          messageApi.open({
            type: "error",
            content: err.message,
          });
        });
    } else {
      router.push(`/auth/login?returnUrl=${path.replaceAll("/", "%2F")}`);
    }
  }, []);

  return (
    <MainCard>
      <div className={styles.result}>
        {content.isConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            tweenDuration={7000}
          />
        )}
        <Image
          className={styles.img}
          src={content.image}
          width={120}
          height={120}
          loading="lazy"
          alt="trophy image"
        />
        <div className={styles["star-wrapper"]}>
          {stars.map((star, index) => (
            <Image
              key={`star-${index}`}
              className={styles.star}
              src={starImage}
              width={35}
              height={35}
              loading="lazy"
              alt="star image"
            />
          ))}
        </div>
        <div className={styles["result-wrapper"]}>
          <div className={styles["result-box"]}>
            correct:
            <span>{content.correct}</span>
          </div>
          <div className={styles["result-box"]}>
            time elapsed:
            <span>{timeElapsed}</span>
          </div>
        </div>
        <div className={styles.title}>{content.title}</div>
        <p className={styles.text}>{content.text}</p>
        <div className={styles.action}>
          <MainButton round onClick={onPlayAgain}>
            Play Again
          </MainButton>
          <Link href={`/profile/results/${id}`}>
            <MainButton variant="primary-outline" round>See Result</MainButton>
          </Link>
        </div>
        {contextHolder}
      </div>
    </MainCard>
  );
};

export default QuestionResult;
