import { useEffect } from "react";

import { useGlobalState } from "@/store/globalstate";
import { useSocketContext } from "@/context/socketContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, toggleFetch } = useGlobalState();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      // const sound = new Audio(notificationSound);
      // sound.play();
      setMessages([...messages, newMessage]);

      toggleFetch();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
