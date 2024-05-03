import { message } from "../types/globalstatetypes";

export default async function GetMessagesFunction(recieverId: string) {
  const res = await fetch(`http://localhost:8000/message/${recieverId}`, {
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
    message: "Messages fetched successfully",
    data: data as message[],
  };
}
