export default async function SendMessageFunction(
  message: string,
  recieverId: string
) {
  const res = await fetch(`http://localhost:8000/message/send/${recieverId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }
  return {
    variant: "default",
    message: "Message sent successfully",
    data: data,
  };
}
