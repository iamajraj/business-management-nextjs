import React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../state/userState";

type Props = {
  children: React.ReactNode;
};

export default function StateSettter({ children }: Props) {
  const [_, setUser] = useRecoilState(userState);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    setUser(user);
  }, []);
  return <>{children}</>;
}
