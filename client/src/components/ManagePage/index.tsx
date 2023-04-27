import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo';
import './index.css'


const ManagePage: React.FC = () => {
    return (<div className="manage-page">
      <UserInfo />
      </div>
      );
  };

export default ManagePage;