"use client";
import Link from "next/link";

import { useUserStore } from "@/store/user-store";
import MainCard from "@/components/ui/card/main/MainCard";
import NotFound from "@/components/ui/not-found/NotFound";
import MainButton from "@/components/ui/button/MainButton";

import ProfileLastResultItem from "./ProfileLastResultItem";
import styles from "./ProfileLastResultList.module.scss";

const ProfileLastResultList = ({ full }: { full?: boolean }) => {
  const user = useUserStore((state) => state.user);
  let userResult = user?.answerdQuestions;
  if (full) {
    userResult = userResult?.slice(0, 10);
  }

  return (
    <MainCard>
      {userResult && userResult.length ? (
        <>
          <ul className={styles.list}>
            {userResult.map((result) => (
              <ProfileLastResultItem
                key={`result-item-${result.id}`}
                resultData={result}
              />
            ))}
            {!full && user?.answerdQuestions.length! > 10 && (
              <Link
                href="/profile/results"
                style={{ display: "block", margin: "15px auto 0 auto" }}
              >
                <MainButton round variant="secondary">
                  See Full History
                </MainButton>
              </Link>
            )}
          </ul>
        </>
      ) : (
        <NotFound>Results</NotFound>
      )}
    </MainCard>
  );
};

export default ProfileLastResultList;
