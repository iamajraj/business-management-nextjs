import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../state/userState";

type Props = {
  children: React.ReactNode;
};

export default function Navigator({ children }: Props) {
  const user = useRecoilValue(userState);
  return user.user_type === "admin" ? <>{children}</> : <>{children}</>;
}
