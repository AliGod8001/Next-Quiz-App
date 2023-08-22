"use client"
import Link from "next/link";

import { encrypt } from "@/utils";
import { useUserStore } from "@/store/user-store";
import ProfileImage from "@/components/ui/image/profile-image";
import Icon from "@/components/ui/Icon";

import styles from "./ProfileHeader.module.scss";

const ProfileHeader = () => {
  const user = useUserStore((state) => state.user);

  const joinDate = new Date(user?.creationDate!);
  const modificationDate = new Date(user?.modificationDate!)
  const birthDate = new Date(user?.birthDate!)

  return (
    <div className={styles.content}>
      <ProfileImage
        src={user?.profileImage}
        className={styles.img}
        userName={user?.userName}
        loading="lazy"
        width={150}
        height={150}
      />
      <Link
        href={`/profile/${encrypt(String(user?.id))}/edit`}
        className={styles.edit}
      >
        <Icon icon="edit" />
      </Link>
      <ul className={styles.list}>
        <li>
          <span className={styles["list-title"]}>User Name :</span>
          <span className={styles["list-text"]}>
            {user?.userName}
          </span>
        </li>
        <li>
          <span className={styles["list-title"]}>Email :</span>
          <span className={styles["list-text"]}>
            {user?.email}
          </span>
        </li>
        <li>
          <span className={styles["list-title"]}>Join Date :</span>
          <span className={styles["list-text"]}>
            {joinDate.toLocaleDateString("en-US")}
          </span>
        </li>
        <li>
          <span className={styles["list-title"]}>Last Change :</span>
          <span className={styles["list-text"]}>
            {modificationDate.toLocaleString("en-US")}
          </span>
        </li>
        <li>
          <span className={styles["list-title"]}>Birth Date :</span>
          <span className={styles["list-text"]}>
            {birthDate.toLocaleDateString("en-US")}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
