"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { DatePicker, Form, Input, message } from "antd";

import { useAuthStore } from "@/store/auth-store";
import MainButton from "@/components/ui/button/MainButton";
import PasswordStrength from "@/components/ui/password-strength/PasswordStrength";
import {
  usernameConfig,
  emailConfig,
  passwordConfig,
  rePasswordConfig,
  birthDateConfig,
} from "@/components/configs/auth-configs";

import styles from "./Signup.module.scss";

const Signup = () => {
  const router = useRouter();
  const returnUrl = useSearchParams().get("returnUrl")

  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const register = useAuthStore((state) => state.Register);
  const [messageApi, contextHoler] = message.useMessage();

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setPassword(event.target.value);
  };

  const formSubmitHandler = async (payload: SignupPayload) => {
    if (payload.password !== payload.rePassword) {
      messageApi.open({
        type: "error",
        content: "password and repassowrd are not the same.",
      });
      return;
    }

    setLoading(true);
    const { status, statusText } = await register({
      birthDate: new Date(payload.birthDate.$d).getTime(),
      email: payload.email,
      password: payload.password,
      userName: payload.username,
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
      layout="vertical"
      onFinish={formSubmitHandler}
    >
      <Form.Item name="username" {...usernameConfig}>
        <Input type="text" placeholder="username" size="large" />
      </Form.Item>

      <Form.Item name="email" {...emailConfig}>
        <Input type="email" placeholder="email" size="large" />
      </Form.Item>

      <Form.Item name="password" {...passwordConfig}>
        <Input.Password
          onChange={passwordChangeHandler}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item name="rePassword" {...rePasswordConfig}>
        <Input.Password type="password" placeholder="RePassword" size="large" />
      </Form.Item>
      {password && password.length > 3 && (
        <PasswordStrength password={password} />
      )}
      <Form.Item name="birthDate" {...birthDateConfig}>
        <DatePicker size="large" />
      </Form.Item>
      <Form.Item>
        <MainButton
          type="submit"
          className={`${loading ? "overlay-loading" : ""}`}
          style={{ width: "100%" }}
        >
          Signup
        </MainButton>
      </Form.Item>
      <span className={styles.link}>
        Do you have account aleardy? <Link href="/auth/login">login</Link>
      </span>
      {contextHoler}
    </Form>
  );
};

export default Signup;
