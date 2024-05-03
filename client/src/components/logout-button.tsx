import React from "react";
import { Button } from "./ui/button";
import LogoutFunction from "@/fetchers/logout";
import { useUserDataPersist } from "@/store/globalstate";

const LogoutButton = ({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild: boolean;
}) => {
  const { removeUserData } = useUserDataPersist();
  const handleLogout = async () => {
    const res = await LogoutFunction();

    if (res.variant === "destructive") return alert(res.message);
    removeUserData();
  };
  if (!asChild) return <Button onClick={handleLogout}>{children}</Button>;
  return (
    <Button onClick={handleLogout} asChild>
      {children}
    </Button>
  );
};

export default LogoutButton;
