import React, { useState } from "react";
import { Dropdown, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import styles from "./UserButton.module.css";
import {getUserData, saveUserData} from "../../utils/storage";
import ProfileUpdateModal from './UpdateProfileModal';

const UserMenu: React.FC = () => {
  const username = getUserData()?.username || 'unknown';
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const handleUpdateUser = (user: any) => {
    console.log('User updated:', user);
    saveUserData({
      ...getUserData(),
      username: user.username,
      email: user.email,
    })
    console.log('User updated:', user);
    setUpdateProfileModalOpen(false);
  };
  
  const handlerLogout = (e: any) => {
    //logout
    saveUserData({});
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `Welcome, ${username}`,
    },
    {
      key: "2",
      label: (
        <Button type="link" onClick={()=>setUpdateProfileModalOpen(true)}>
          Update Profile
        </Button>
      ),
    },
    {
      key: "3",
      danger: true,
      label: (
        <a href="/" onClick={handlerLogout}>
          Logout
        </a>
      ),
    },
  ];

  return (
    <div className={styles["user-avtar"]}>
      <ProfileUpdateModal
        visible={updateProfileModalOpen}
        onCancel={() => setUpdateProfileModalOpen(false)}
        onUpdate={handleUpdateUser}
      />
      <Dropdown menu={{ items }}>
        <UserOutlined />
      </Dropdown>
      <h4>{`Welcome, ${username}`}</h4>
    </div>
  );
};

export default UserMenu;
