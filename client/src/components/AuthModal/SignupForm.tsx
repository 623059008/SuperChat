import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import {
  getUserData,
  saveUserData,
} from "../../utils/storage";
import { registerRequest } from "../../requests";
import styles from "./AuthModal.module.css";

type SignupFormProps = {
  onClose: () => void;
  switchLogin: () => void;
  showInfo: (title: string, type?: string) => void;
};

const SignupForm = ({ onClose, switchLogin, showInfo }: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const updateEmail = (email: string) => {
    const userData = getUserData() || {};
    saveUserData({
      ...userData,
      email,
    });
  }

  const updateUserId = (userId: string) => {
    const userData = getUserData() || {};
    saveUserData({
      ...userData,
      userId,
    });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
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

  const handleSubmit = async () => {
    if (!username || !email || !password || !confirmPassword) {
      showInfo('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      showInfo('Passwords do not match');
      return;
    }
    try {
      setConfirmLoading(true);
      console.log('send register request', username, email, password);
      const res = await registerRequest(username, email, password);
      setConfirmLoading(false);
      if (!res) {
        showInfo('Fail to Register');
        return;
      }
      console.log('[LOG] signup res', res);
      updateEmail(res.email);
      updateUserId(res._id);
      showInfo('Register Successfully', "success");
      switchLogin();
    } catch (err: any) {
      showInfo(err.message);
    }
    setConfirmLoading(false);
  };

  return (
    <>
      <Form onFinish={handleSubmit} {...formItemLayout} layout="horizontal">
        <Form.Item label={'Username'}>
          <Input
            id="username"
            type="text"
            placeholder={'Please enter your username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
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
        <Form.Item label={'Confirm'}>
          <Input
            id="confirmPassword"
            type="password"
            placeholder={'Please confirm your password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={confirmLoading}
          >
            Register
          </Button>
        </Form.Item>
        <div>
          <span className={styles["text-gray-500"]}>
            Have an account?{" "}
          </span>
          <Button type="link" onClick={switchLogin}>
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
