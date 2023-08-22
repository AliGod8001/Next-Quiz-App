import MainCard from "@/components/ui/card/main/MainCard";

import styles from "./layout.module.scss";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <MainCard>
        <div className={styles.header}>
          <span className={styles.title}>Quiz App</span>
          <span className={styles.text}>
            Hey, Enter your details to go to your account
          </span>
        </div>
        {children}
      </MainCard>
    </div>
  );
};

export default AuthPageLayout;
