import React from "react";
import { Button } from "./ui/button";

const LogoutForm = ({children,asChild}:{children:React.ReactNode,asChild:boolean}) => {
  
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  }
  if(!asChild) return (
    <Button  onClick={handleLogout}>
      {children}
    </Button>
  )
  return (
    <Button onClick={handleLogout} asChild>
      {children}
    </Button>
  )
};

export default LogoutForm;
