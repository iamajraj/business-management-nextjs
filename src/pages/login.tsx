import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import userState from "../state/userState";

type CredentialType = {
  email: string;
  password: string;
};

export default function Login() {
  const [credentials, setCredentials] = useState<CredentialType>({
    email: "",
    password: "",
  });
  const [_, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (loginFor: string) => {
    try {
      const { email, password } = credentials;
      if (!email || !password) return;
      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
          loginFor,
        },
        {
          withCredentials: true,
        }
      );
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.replace(`/${loginFor}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Tabs defaultValue="account" className="w-full max-w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Employee</TabsTrigger>
          <TabsTrigger value="password">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to login to your employee account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input
                  placeholder="Your email address"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  placeholder="Your Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} onClick={() => login("employee")}>
                {loading ? "Logging in..." : "Login as Employee"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to login to your admin account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  type="email"
                  placeholder="Your email address"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <Input
                  placeholder="Your Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} onClick={() => login("admin")}>
                {loading ? "Logging in..." : "Login as Admin"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
