import { useState, useEffect } from "react";
import Link from "next/link";

import GetQuestionPack from "@/services/question-packs/GetQuestionPack";
import GetSubCategory from "@/services/sub-categories/GetSubCategory";
import GetCategory from "@/services/categories/GetCategory";
import useFormatResult from "@/hooks/use-format-result";

import styles from "./ProfileLastResultItem.module.scss";
import MainButton from "@/components/ui/button/MainButton";

const ProfileLastResultItem = ({
  resultData,
}: {
  resultData: QuestionPackResult;
}) => {
  const [questionPackTitle, setQuestionPackTitle] = useState<string | null>(
    null
  );
  const [questionLink, setQuestionLink] = useState<string | null>(null);

  const { time, correctCount } = useFormatResult(resultData);

  useEffect(() => {
    GetQuestionPack(resultData.questionPackId)
      .then((data) => {
        if (data.status === 201) {
          GetSubCategory(data.data?.subCategory_id!).then((data) => {
            if (data.status === 201) {
              const subCategory_id = data.data?.id;
              setQuestionPackTitle(data.data?.title!);
              GetCategory(data.data?.category_id!).then((data) => {
                setQuestionLink(
                  `/${data.data?.mainCategory_id!}/${
                    data.data?.id
                  }/${subCategory_id}`
                );
              });
            } else {
              setQuestionPackTitle(data.statusText);
            }
          });
        } else {
          setQuestionPackTitle(data.statusText);
        }
      })
      .catch((err: Error) => {
        setQuestionPackTitle(err.message);
      });
  }, []);

  return (
    <li className={styles.link}>
      <h4 className={styles.title}>{questionPackTitle ? questionPackTitle : "loading..."}</h4>

      <div className={styles.item}>
        Point: <span>{resultData.point}</span>
      </div>

      <div className={styles.item}>
        correct: <span>{correctCount}</span>
      </div>

      <div className={styles.item}>
        time: <span>{time}</span>
      </div>

      <Link
        href={`/profile/results/${resultData.id}`}
        className={styles.result}
      >
        <MainButton variant="secondary-flat">See Result</MainButton>
      </Link>
      <Link href={questionLink ? questionLink : "/"}>
        <MainButton className={!questionLink ? "overlay-loading" : ""}>
          Quiz Again
        </MainButton>
      </Link>
    </li>
  );
};

export default ProfileLastResultItem;
