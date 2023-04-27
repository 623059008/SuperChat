import React, { useState, useEffect } from 'react';
import type { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData, useParams } from "react-router-dom";
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/storage';
import { uuid } from '../../utils/uuid';
import { respondToUser } from '../../utils/randomReply';
import { ChatMessage, ChatUser, ChatUserResponse } from './types';
import { userList } from '../../userdata';
import UserInfo from './UserInfo';
import './index.css'


const ManagePage: React.FC = () => {
    const { id } = useParams();
    const oppoUserData = userList.find((user) => {
      if(String(user.id) === String(id)) {
        return user;
      }
    }) as ChatUser;
    // console.log('[debug] oppoUserData: ', oppoUserData)
    const oppoId = oppoUserData.id;
    const [messageList, setMessageList] = useState<ChatMessage[]>([]);
    
    useEffect(() => {
      if(!oppoId) return;
    }, [oppoId]);
    

    return (<div className="manage-page">
      <UserInfo />
      </div>
      );
  };

export default ManagePage;