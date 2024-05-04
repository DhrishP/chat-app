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
      const newSocket = io("http://localhost:8000");
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
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
