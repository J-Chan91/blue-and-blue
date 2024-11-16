"use server";

import CryptoJS from "crypto-js";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  const encryptedToken = CryptoJS.SHA256("dadd").toString();

  cookieStore.set("token", encryptedToken);

  return { target: "", message: "" };
}
