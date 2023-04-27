import { useState, useEffect, useRef } from 'react'
import { Outlet } from "react-router-dom";
import AuthModal from './components/AuthModal/AuthModal'
import ProfileCard from './components/ProfileCard'
import ManagePage from './components/ManagePage'
import UserButton from './components/UserButton/UserButton';
import {ChatUser} from './components/ChatPage/types'
import { loadFromLocalStorage } from './utils/storage';
import { userList } from './userdata';

import './App.css'


// get url params id and set selected user
const getUrlParams = () => {
  // get id from `xxx/chat/:id`
  const path = window.location.pathname; // get the path of the current URL
  const id = path.split('/').pop(); // extract the last segment of the path (i.e., the id)
  return id;
}

function App() {
  const [selected, setSelected] = useState(getUrlParams());
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const userType = loadFromLocalStorage('user-data')?.type || 'user';

  useEffect(() => {
    const selectedElement = document.querySelector(`.card-item.active`) as HTMLDivElement;
    if (selectedElement) {
      const leftPanel = leftPanelRef.current;
      if(!leftPanel) return;
      const targetPosition = selectedElement.offsetTop - 25;
      const startPosition = leftPanel.scrollTop;
      const distance = targetPosition - startPosition;
      const duration = 500; // adjust the duration as desired
      let startTime = 0;
      
      function scrollAnimation(currentTime: number) {
        if(!leftPanel) return;
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const easing = (t:number) => t * (2 - t);
        const scrollPosition = startPosition + distance * easing(timeElapsed / duration);
        leftPanel.scrollTop = scrollPosition;
        if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
      }

      requestAnimationFrame(scrollAnimation);
    }
  }, [selected]);

  return (
    <>
    <AuthModal />
    {userType === 'admin' && <ManagePage />}
    {userType === 'user' && <div className="App">
      <div className="left-panel" ref={leftPanelRef}>
        <UserButton />
        {userList.map((user: ChatUser) => 
          <div key={`usercard_${user.id}`} className={`card-item ${user.id == String(selected) ? 'active' : ''}`}>
            <ProfileCard
              key={`user_${user.id}`}
              data={user}
              setSelected={setSelected}
            />
          </div>
        )}
      </div>
      <div className="right-panel">
        <Outlet />
      </div>
    </div>}
    </>
  )
}

export default App
