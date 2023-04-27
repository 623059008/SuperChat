import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChatPage, { chatLoader } from './components/ChatPage'
import ManagePage from './components/ManagePage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "chat/:id",
        element: <ChatPage />,
        loader: chatLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
