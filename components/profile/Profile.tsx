import UserBoundryProvider from "@/components/providers/UserBoundryProvider";
import Title from "@/components/ui/title/Title";
import MainCard from "@/components/ui/card/main/MainCard";

import ProfileHeader from "./ProfileHeader";
import ProfileResult from "./ProfileResult";
import ProfileLastResultList from "./last-result/ProfileLastResultList";
import styles from "./Profile.module.scss";

const Profile = () => {
  return (
    <UserBoundryProvider>
      <Title href="/" linkText="Back">
        Profile Account
      </Title>
      <div className={styles.wrapper}>
        <MainCard className={styles.box}>
          <ProfileHeader />
        </MainCard>
        <MainCard className={styles.box}>
          <ProfileResult />
        </MainCard>
      </div>
      <ProfileLastResultList />
    </UserBoundryProvider>
  );
};

export default Profile;
