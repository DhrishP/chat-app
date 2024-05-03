

export default async function SignUpFunction(
  username: string,
  email: string,
  password: string,
  gender: string
) {
 
  if (username === "" || email === "" || gender === "" || password === "") {
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
  if (gender !== "male" && gender !== "female") {
    return {
      variant: "destructive",
      message: "Please select appropriate gender",
    };
  }
  const res = await fetch("http://localhost:8000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, email, password, gender }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { variant: "destructive", message: "Something went wrong" };
  }

  return { variant: "default", message: "Account created successfully",data:data };
}
