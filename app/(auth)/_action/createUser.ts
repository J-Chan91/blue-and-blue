"use server";

import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const userPassword = formData.get("userPassword");

  if (!userId) {
    return {
      target: "userId",
      message: "아이디를 입력해주세요",
    };
  }

  if (!userPassword) {
    return {
      target: "userPassword",
      message: "비밀번호를 입력해주세요",
    };
  }

  return redirect("/login");
}
