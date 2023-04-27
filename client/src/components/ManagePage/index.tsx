import React, { useState, useEffect } from "react";
import UserButton from '../UserButton/UserButton'
import UserInfo from "./UserInfo";
import "./index.css";

const ManagePage: React.FC = () => {
  return (
    <div className="manage-page">
      <UserButton />
      <h1>User Manage Page</h1>
      <UserInfo />
    </div>
  );
};

export default ManagePage;
