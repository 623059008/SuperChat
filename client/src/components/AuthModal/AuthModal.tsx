import React, { useState, useMemo } from "react";
import { Button, Modal, notification } from "antd";
import {
  getUserData,
  saveUserData,
} from "../../utils/storage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./AuthModal.module.css";

const AuthModal = () => {
  const authSession = getUserData()?.session as string;
  const [showLogin, setShowLogin] = useState(true);
  const [open, setOpen] = useState(!authSession);

  const showInfo = (title: string, type = "warning") => {
    type === "warning"
      ? notification.warning({
          message: title,
        })
      : notification.success({
          message: title,
        });
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
  };

  return (
    <Modal
      centered
      title={
        showLogin ? "Login" : "Sign Up"
      }
      closable={false}
      footer={null}
      open={open}
    >
      {showLogin ? (
        <LoginForm
          onClose={() => setOpen(false)}
          switchBack={handleSwitchToSignup}
          showInfo={showInfo}
        />
      ) : (
        <SignupForm
          onClose={() => setOpen(false)}
          switchLogin={() => setShowLogin(true)}
          showInfo={showInfo}
        />
      )}
    </Modal>
  );
};

export default AuthModal;
