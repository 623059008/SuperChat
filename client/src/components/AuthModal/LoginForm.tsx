import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { loginRequest } from "../../requests";
import {
  getUserData,
  saveUserData,
} from "../../utils/storage";
import styles from "./AuthModal.module.css";

type LoginFormProps = {
  onClose: () => void;
  switchBack: () => void;
  showInfo: (title: string, type?: string) => void;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4, textAlign: "left" },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const buttonItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
  },
};

const LoginForm = ({ onClose, switchBack, showInfo }: LoginFormProps) => {
  const signUpEmail = getUserData()?.email as string;
  const [email, setEmail] = useState<string>(signUpEmail || "");
  const [password, setPassword] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      showInfo("Please fill in all fields");
      return;
    }
    try {
      setConfirmLoading(true);
      const res = await loginRequest(email, password);
      setConfirmLoading(false);
      // console.log("[debug] login res", res);
      // Handle successful login
      if (!res) {
        showInfo('Fail to Login');
        return;
      }
      saveUserData({userId: res.userId, email: email, session: res.session, username: res.username, type: res.type});
      showInfo('Login Success!', "success");
      onClose();
      // refresh page
      window.location.reload();
    } catch (err: any) {
      console.log("[debug] login err", err)
      showInfo(err.message);
    }
    setConfirmLoading(false);
  };

  return (
    <>
      <Form {...formItemLayout} layout="horizontal" onFinish={handleSubmit}>
        <Form.Item label={'Email'}>
          <Input
            id="email"
            type="email"
            placeholder={'Please enter your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label={'Password'}>
          <Input
            id="password"
            type="password"
            placeholder={'Please enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={confirmLoading}
          >
            Login
          </Button>
        </Form.Item>
        <Form.Item>
          <span className={styles["text-gray-500"]}>
            Don't have an account?{" "}
          </span>
          <Button type="link" onClick={switchBack}>
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
