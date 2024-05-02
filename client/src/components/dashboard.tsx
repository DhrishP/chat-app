import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GetSidebarUsersFunction from "@/fetchers/get-sidebar-users";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { sideBarUsers } from "@/types/globalstatetypes";

function Sidebar() {
  const [users, setUsers] = useState<sideBarUsers[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getUsers = async () => {
      const res = await GetSidebarUsersFunction();

      if (res.data) {
        toast({
          title: res.message,
          variant: res.variant as "default" | "destructive" | null | undefined,
        });
        setUsers(res.data);
      }
      toast({
        title: res.message,
        variant: res.variant as "default" | "destructive" | null | undefined,
      });
    };
    getUsers();
  }, []);
  return (
    <div className="flex h-full w-[300px] flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-[60px] items-center border-b px-4">
        <h2 className="text-lg font-semibold">Chats</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-2 py-4">
          {users.map((user) => (
            <Link 
            className="flex items-center gap-3 rounded-md bg-gray-200 px-3 py-2 text-gray-900 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
            to={""}
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
            </Link>
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
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex h-[60px] items-center border-b bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage alt="Avatar" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">{/* Add chat messages here */}</div>
      </div>
      <div className="flex h-[60px] items-center border-t bg-gray-100 px-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex w-full items-center gap-2">
          <Input
            className="flex-1"
            placeholder="Type your message..."
            type="text"
          />
          <Button>Send</Button>
        </div>
      </div>
    </div>
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
