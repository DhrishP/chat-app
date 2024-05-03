import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
// import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GetSidebarUsersFunction from "@/fetchers/get-sidebar-users";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { message, sideBarUsers } from "@/types/globalstatetypes";
import { useGlobalState, useUserDataPersist } from "@/store/globalstate";
import GetMessagesFunction from "@/fetchers/get-messages";
import SendMessageFunction from "@/fetchers/send-message";
import { formatTimeFromISO } from "@/lib/change-iso-to-hours";
import LogoutButton from "./logout-button";

function Sidebar() {
  const [users, setUsers] = useState<sideBarUsers[]>([]);
  const { toast } = useToast();
  const { setConversation, conversationId, setMessages,setName,setpfpUrl } = useGlobalState();

  useEffect(() => {
    const getUsers = async () => {
      const res = await GetSidebarUsersFunction();

      if (res.data) {
        setUsers(res.data);
        return;
      }
      toast({
        title: res.message,
        variant: res.variant as "default" | "destructive" | null | undefined,
      });
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    const getMessages = async () => {
      const res = await GetMessagesFunction(conversationId);
      if (res.data) {
        setMessages(res.data);
        return;
      }
      toast({
        title: res.message,
        variant: res.variant as "default" | "destructive" | null | undefined,
      });
    };
    getMessages();
  }, [conversationId]);
  return (
    <div className="flex h-full w-[300px] flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-[60px] items-center justify-between border-b px-4">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-2 py-4">
          {users.map((user) => (
            <div
              className={`flex items-center gap-3 rounded-md ${
                conversationId === user.id
                  ? "bg-yellow-400 hover:bg-gray-300"
                  : "bg-gray-200 hover:bg-yellow-100"
              } px-3  py-2 text-gray-900 transition-all cursor-pointer dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700`}
              onClick={() => {
                setConversation(user.id);
                setpfpUrl(user.profileUrl);
                setName(user.username);
              }}
              key={user.id}
            >
              <Avatar>
                <AvatarImage alt="Avatar" src={user.profileUrl} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium">{user.username}</span>
                {/* <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.status}
              </span> */}
              </div>
            </div>
          ))}
          {/* <Link
            className="flex items-center gap-3 rounded-md bg-gray-200 px-3 py-2 text-gray-900 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            to={""}
          >
            <Avatar>
              <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">John Doe</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Hey, how's it going?
              </span>
            </div>
          </Link> */}
        </nav>
      </div>
    </div>
  );
}

function Chat() {
  const { conversationId, messages ,setMessages , conversationpfpUrl ,conversationName} = useGlobalState();
  const { userData } = useUserDataPersist();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [fetch, setFetch] = useState(false);

  
  console.log("messages", messages);

  const handleSend = async () => {
    setLoading(true);
    if (!input)
      return toast({ title: "Please enter a message", variant: "destructive" });
    const res = await SendMessageFunction(input, conversationId);
    if (res.data) {
      setInput("");
      setLoading(false);
      setFetch(!fetch);
      return;
    }
    toast({
      title: res.message,
      variant: res.variant as "default" | "destructive" | null | undefined,
    });
    setLoading(false);
  };
  
  useEffect(() => {
    if (!conversationId) return;
    const getMessages = async () => {
      const res = await GetMessagesFunction(conversationId);
      if (res.data) {
        setMessages(res.data);
        return;
      }
      toast({
        title: res.message,
        variant: res.variant as "default" | "destructive" | null | undefined,
      });
    };
    getMessages();
  }, [conversationId,fetch]);

  if (!conversationId) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <h2 className="text-2xl animate-pulse font-semibold">
          Select a chat to start messaging
        </h2>
      </div>
    );
  }

  // <div className="flex justify-end items-start gap-4">
  //   <div className="max-w-[75%] rounded-lg bg-blue-500 p-3 text-sm text-white">
  //     <p>I'm doing great, thanks for asking!</p>
  //     <p className="mt-2 text-xs text-gray-200">10:31 AM</p>
  //   </div>
  //   <Avatar>
  //     <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
  //     <AvatarFallback>JD</AvatarFallback>
  //   </Avatar>
  // </div>;
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <div className="flex h-[60px] items-center border-b bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage alt="Avatar" src={conversationpfpUrl} />
              <AvatarFallback>{conversationName}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{conversationName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-4">
            {messages[0] ? (
              // @ts-expect-error
              messages[0].map((message: message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === userData?.id
                      ? "justify-end"
                      : "justify-start"
                  } items-start gap-4`}
                >
                  {message.senderId !== userData?.id && (
                    <Avatar>
                    <AvatarImage
                      alt="Avatar"
                      src={
                        message.senderId === userData?.id
                          ? userData.profileUrl
                          : ""
                      }
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg ${
                      message.senderId === userData?.id
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    } p-3 text-sm text-white`}
                  >
                    <p>{message.message}</p>
                    <p className="mt-2 text-xs text-gray-200">
                      {formatTimeFromISO(message.createdAt)}
                    </p>
                  </div>
                  {message.senderId === userData?.id && (
                  <Avatar>
                    <AvatarImage
                      alt="Avatar"
                      src={
                        message.senderId === userData?.id
                          ? userData.profileUrl
                          : ""
                      }
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  )}
                </div>
              ))
            ) : (
              <div>
                <h2 className="text-2xl animate-pulse font-semibold">
                  No messages yet
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[60px] items-center border-t bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="flex w-full items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Type your message..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSend} disabled={loading}>
              Send
            </Button>
            <LogoutButton asChild={true}>
              <Button variant={"destructive"}>Logout</Button>
            </LogoutButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashComponent() {
  return (
    <div className="flex h-[100dvh] w-full">
      <Sidebar />
      <Chat />
    </div>
  );
}
