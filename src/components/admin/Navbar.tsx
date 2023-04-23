import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../../state/userState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
  selected?: string;
};

export default function Navbar({ selected }: Props) {
  const user = useRecoilValue(userState);

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/api/auth/signout");
      router.replace("/login");
    } catch (err) {}
  };

  return (
    <div className="h-[70px] px-10 border-b flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          <div className="flex items-center gap-2 border-none outline-none">
            <div className="w-[25px] h-[25px] rounded-full bg-indigo-500"></div>
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
      <div className="mx-5 bg-gray-200 h-full w-[1px]"></div>
      <ul className="flex items-center gap-10">
        <Link
          href="/admin"
          className={`cursor-pointer ${
            selected === "organizations"
              ? "bg-[#0F1827] text-white px-4 py-2 rounded-md"
              : ""
          }`}
        >
          Organizations
        </Link>
        <li className="cursor-pointer">
          <Link
            href="/admin/employees"
            className={`cursor-pointer ${
              selected === "employees"
                ? "bg-[#0F1827] text-white px-4 py-2 rounded-md"
                : ""
            }`}
          >
            Employees
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            href="/admin/projects"
            className={`cursor-pointer ${
              selected === "projects"
                ? "bg-[#0F1827] text-white px-4 py-2 rounded-md"
                : ""
            }`}
          >
            Projects
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            href="/admin/vendors"
            className={`cursor-pointer ${
              selected === "vendors"
                ? "bg-[#0F1827] text-white px-4 py-2 rounded-md"
                : ""
            }`}
          >
            Vendors
          </Link>
        </li>
        <li className="cursor-pointer">
          <Link
            href="/admin/clients"
            className={`cursor-pointer ${
              selected === "clients"
                ? "bg-[#0F1827] text-white px-4 py-2 rounded-md"
                : ""
            }`}
          >
            Clients
          </Link>
        </li>
      </ul>
    </div>
  );
}
