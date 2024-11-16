"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import CryptoJS from "crypto-js";

export async function createUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const userPassword = formData.get("userPassword") as string;

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

  try {
    const newUser = await prisma.user.create({
      data: {
        name: userId,
        password: CryptoJS.SHA256(userPassword).toString(),
      },
    });

    console.log(newUser);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          target: "userId",
          message: "이미 등록된 아이디입니다",
        };
      }
    }
  }

  return {
    target: "",
    message: "",
  };
  //   return redirect("/login");
}
