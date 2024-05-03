import { Link} from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserDataPersist } from "@/store/globalstate";
import SignUpFunction from "@/fetchers/signup";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { userData, setUserData } = useUserDataPersist();
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await SignUpFunction(username, email, password, gender);
    toast({
      title: res.message,
      variant: res.variant as "default" | "destructive" | null | undefined,
    });
    if (res.data) {
      setUserData(res.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setGender("");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (userData?.email) {
      navigate('/', { replace: true });
    }
  }, [userData]);

  return (
    <div className="flex items-center h-screen w-screen">
      <Card className="mx-auto max-w-sm px-5  border-1 shadow-md border-primary">
        <CardHeader className="self-start">
          <CardTitle className="text-xl text-start">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <Button
              type="button"
              className="w-full mt-3"
              onClick={handleSignUp}
              disabled={loading}
            >
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
