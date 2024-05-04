import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./components/sign-up.tsx";
import LoginForm from "./components/login.tsx";
import { Toaster } from "@/components/ui/toaster";
import { SocketContextProvider } from "./context/socketContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <SocketContextProvider>
    <RouterProvider router={router} />
    </SocketContextProvider>
  </React.StrictMode>
);
