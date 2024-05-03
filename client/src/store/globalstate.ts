import { message, userData } from "@/types/globalstatetypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type GlobalState = {
  conversationId: string;
  conversationpfpUrl: string;
  conversationName: string;
  messages: message[];
  setConversation: (data: string) => void;
  setMessages: (data: message[]) => void;
  setpfpUrl: (data: string) => void;
  setName: (data: string) => void;
};

type UserDataLocal = {
  userData: userData | null;
  setUserData: (data: userData) => void;
  removeUserData: () => void;
};

export const useGlobalState = create<GlobalState>((set) => ({
  conversationId: '',
  conversationpfpUrl: '',
  conversationName: '',
  messages: [], // Fix: Change from {} to []
  setConversation: (data) => set(() => ({ conversationId: data })),
  setMessages: (data) => set((state) => ({ ...state, messages: data })),
  setpfpUrl: (data) => set(() => ({ conversationpfpUrl: data })),
  setName: (data) => set(() => ({ conversationName: data })),
}));

export const useUserDataPersist = create(
  persist<UserDataLocal>(
    (set) => ({
      userData: null,
      setUserData: (data) => set((state) => ({ ...state, userData: data })),
      removeUserData: () => set(() => ({ userData: null })),
    }),
    {
      name: "user-data", // unique name
      storage:createJSONStorage(()=>localStorage), 
    }
  ),
);
