export default async function LogoutFunction() {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }
  return {
    variant: "default",
    message: "Logged out successfully",
    data: data,
  };
}
