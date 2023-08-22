"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Form, Input, message } from "antd";

import { useAuthStore } from "@/store/auth-store";
import MainButton from "@/components/ui/button/MainButton";
import {
  usernameConfig,
  passwordConfig,
} from "@/components/configs/auth-configs";

import styles from "./Login.module.scss";

const Login = () => {
  const router = useRouter();
  const returnUrl = useSearchParams().get("returnUrl")

  const [loading, setLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const [messageApi, contextHolder] = message.useMessage();

  const formSubmitHandler = async (payload: LoginPayload) => {
    setLoading(true);
    const { status, statusText } = await login({
      username: payload.username,
      password: payload.password,
    });
    setLoading(false);

    if (status === 201) {
      messageApi.open({
        type: "success",
        content: statusText,
      });
      setTimeout(() => {
        if ( returnUrl ) router.push(returnUrl)
        else router.push("/");
      }, 1500);
      return;
    }

    messageApi.open({
      type: "error",
      content: statusText,
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={formSubmitHandler}
    >
      <Form.Item name="username" {...usernameConfig}>
        <Input type="text" placeholder="username" size="large" />
      </Form.Item>

      <Form.Item name="password" {...passwordConfig}>
        <Input.Password type="password" placeholder="Password" size="large" />
      </Form.Item>
      <Form.Item>
        <MainButton
          type="submit"
          className={`${loading ? "overlay-loading" : ""}`}
          style={{ width: "100%" }}
        >
          Login
        </MainButton>
      </Form.Item>
      <span className={styles.link}>
        Dont you have accoutn already? <Link href="/auth/signup">signup</Link>
      </span>
      {contextHolder}
    </Form>
  );
};

export default Login;
