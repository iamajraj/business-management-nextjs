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
import Head from "next/head";
import Organizations from "../../components/admin/Organizations/Organizations";

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

  const setTitle = (name: string) => {
    document.title = `Admin | ${name}`;
  };

  return (
    <>
      <Head>
        <title>Admin | Organizations</title>
      </Head>
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
          <TabsTrigger
            onClick={() => setTitle("Organizations")}
            value="organizations"
          >
            Organizations
          </TabsTrigger>
          <TabsTrigger onClick={() => setTitle("Employees")} value="employees">
            Employees
          </TabsTrigger>
          <TabsTrigger onClick={() => setTitle("Projects")} value="projects">
            Projects
          </TabsTrigger>
          <TabsTrigger onClick={() => setTitle("Vendors")} value="vendors">
            Vendors
          </TabsTrigger>
          <TabsTrigger onClick={() => setTitle("Clients")} value="clients">
            Clients
          </TabsTrigger>
        </TabsList>
        <TabsContent value="organizations">
          <Organizations />
        </TabsContent>
        <TabsContent value="employees">employees</TabsContent>
        <TabsContent value="projects">projects</TabsContent>
        <TabsContent value="vendors">vendors</TabsContent>
        <TabsContent value="clients">clients</TabsContent>
      </Tabs>
    </>
  );
}
