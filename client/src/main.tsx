import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUpForm from './components/sign-up.tsx';
import LoginForm from './components/login.tsx';
import LogoutForm from './components/logout.tsx';
import { Toaster } from "@/components/ui/toaster"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/signup',
    element: <SignUpForm />,
  },
  {
    path:'/login',
    element: <LoginForm />,
  },
  {
    path:'/logout',
    element: <LogoutForm />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Toaster />
  <RouterProvider router={router} />

  </React.StrictMode>,
)
