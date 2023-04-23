import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRecoilValue } from "recoil";
import userState from "../../state/userState";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {};

export default function Admin({}: Props) {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/api/auth/signout");
      router.replace("/login");
    } catch (err) {}
  };
  return (
    <Tabs defaultValue="organizations" className="w-full">
      <TabsList className="border-b h-[70px] w-full bg-transparent justify-start pl-10 gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none">
            <div className="flex items-center gap-2 border-none outline-none">
              <div className="w-[10px] h-[10px] rounded-full bg-indigo-500"></div>
              <span>{user.email}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TabsTrigger value="organizations">Organizations</TabsTrigger>
        <TabsTrigger value="employees">Employees</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="vendors">Vendors</TabsTrigger>
        <TabsTrigger value="clients">Clients</TabsTrigger>
      </TabsList>
      <TabsContent value="organizations">organizations</TabsContent>
      <TabsContent value="employees">employees</TabsContent>
      <TabsContent value="projects">projects</TabsContent>
      <TabsContent value="vendors">vendors</TabsContent>
      <TabsContent value="clients">clients</TabsContent>
    </Tabs>
  );
}
