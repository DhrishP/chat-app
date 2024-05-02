import { conversation, message, userData } from "@/types/globalstatetypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type GlobalState = {
  conversation: conversation;
  messages: message;
  setUserData: (data: userData) => void;
  setConversation: (data: conversation) => void;
  setMessages: (data: message) => void;
};

type UserDataLocal = {
  userData: userData | null;
  setUserData: (data: userData) => void;
  
};

export const useGlobalState = create<GlobalState>((set) => ({
  conversation: {
    participants: [],
  }, // Fix: Change from [] to ''
  messages: [],
  setUserData: (data) => {
    set((state) => {
      localStorage.setItem("userData", JSON.stringify(data));
      return { ...state, userData: data };
    });
  },
  setConversation: (data) => set((state) => ({ ...state, conversation: data })),
  setMessages: (data) => set((state) => ({ ...state, messages: data })),
}));

export const useUserDataPersist = create(
  persist<UserDataLocal>(
    (set) => ({
      userData: null,
      setUserData: (data) => set((state) => ({ ...state, userData: data })),
    }),
    {
      name: "user-data", // unique name
      storage:createJSONStorage(()=>sessionStorage), 
    }
  ),
);
