"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { message } from "antd";

import { useUserStore } from "@/store/user-store";
import MainCard from "@/components/ui/card/main/MainCard";

import ProfileEditForm from "./ProfileEditForm";

const ProfileEdit = ({ userId }: { userId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = useUserStore((state) => state.setUser);
  const [messageApi, contextHolder] = message.useMessage();

  const submitFormHandler = async (value: UserEditPayload) => {
    setLoading(true);
    const { status, statusText } = await setUser({
      birthDate: value.birthdate
        ? new Date(value.birthdate.$d).getTime()
        : null,
      oldpassword: value.oldpassword,
      newpassword: value.newpassword,
      newRepassword: value.repassword,
      userName: value.username,
      profileImage: value.profileimage ? value.profileimage : null,
    });
    setLoading(false);

    if (status === 201) {
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
    messageApi.open({
      type: status === 201 ? "success" : "error",
      content:
        status === 201 ? "Your Profile Info Successfully Changed" : statusText,
    });
  };

  return (
    <MainCard>
      <ProfileEditForm onSubmitForm={submitFormHandler} loading={loading} />
      {contextHolder}
    </MainCard>
  );
};

export default ProfileEdit;
