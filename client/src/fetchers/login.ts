export default async function LoginFunction(email: string, password: string) {
  if (email === "" || password === "") {
    return { variant: "destructive", message: "Please fill in all fields" };
  }
  if (password.length < 8) {
    return {
      variant: "destructive",
      message: "Password must be at least 8 characters",
    };
  }
  if (!email.includes("@")) {
    return {
      variant: "destructive",
      message: "Please enter a valid email address",
    };
  }
  const res = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }

  return {
    variant: "default",
    message: "Logged in successfully",
    data: data,
  };
}
