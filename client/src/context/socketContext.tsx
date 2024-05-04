import { useEffect } from "react";
import { useState } from "react";
import io, { Socket } from "socket.io-client";
import DefaultEventsMap from "socket.io-client";
import React from "react";
import { useUserDataPersist } from "@/store/globalstate";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | null;
}

const SocketContext = React.createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket<
    typeof DefaultEventsMap,
    typeof DefaultEventsMap
  > | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>([]);
  const { userData } = useUserDataPersist();

  useEffect(() => {
    if (userData) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: userData.id,
        },
      });
      // newSocket.on("connect", () => {
      //   console.log("connected to server", newSocket.id);
      // });
      newSocket.on("onlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
