import { message } from "../types/globalstatetypes";

export default async function GetMessagesFunction(recieverId: string) {
  const res = await fetch(`http://localhost:8000/message/${recieverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }
  let data;
  try {
    data = await res.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return { variant: "default", message: "Failed to parse JSON",data:[] as message[]};
  }
  return {
    variant: "default",
    message: "Messages fetched successfully",
    data: data as message[],
  };
}
