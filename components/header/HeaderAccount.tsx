"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Dropdown } from "antd";

import { useUserStore } from "@/store/user-store";
import { useAuthStore } from "@/store/auth-store";
import items from "@/components/configs/header-account-links";
import MainButton from "@/components/ui/button/MainButton";
import ProfileImage from "@/components/ui/image/profile-image";

import styles from "./HeaderAccount.module.scss";

const HeaderAccount = () => {
  const [token, logout] = useAuthStore((state) => [state.token, state.logout]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    items?.push({
      key: 2,
      danger: true,
      label: <span onClick={logout}>logout</span>,
    });
  }, []);

  return token ? (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className={styles.account}>
        <ProfileImage
          src={user?.profileImage}
          width={40}
          height={40}
          loading="lazy"
          className={styles.img}
          userName={user?.userName}
        />
        {/* {user?.profileImage ? (
          <Image
            className={styles.img}
            src={user.profileImage}
            width={40}
            height={40}
            loading="lazy"
            alt={`${user.userName} profile image`}
          />
        ) : (
          <Avatar className={styles.img}>{user?.userName[0]}</Avatar>
        )} */}
        <span className={styles.name}>{user?.userName}</span>
      </div>
    </Dropdown>
  ) : (
    <>
      <Link href="/auth/login">
        <MainButton>Login</MainButton>
      </Link>
      <Link href="/auth/signup">
        <MainButton variant="primary-flat">Signup</MainButton>
      </Link>
    </>
  );
};

export default HeaderAccount;
