import { sideBarUsers } from "@/types/globalstatetypes";

export default async function GetSidebarUsersFunction() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }
  return {
    variant: "default",
    message: "Users fetched successfully",
    data: data as sideBarUsers[],
  };
}
