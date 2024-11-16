"use server";

import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { pattern } from "@/lib/pattern";

const SALT_ROUNDS = 10;
const ERROR_MESSAGES = {
  INVALID_ID: "유효한 아이디가 아닙니다",
  INVALID_PASSWORD: "유효한 비밀번호가 아닙니다",
  DUPLICATE_ID: "이미 등록된 아이디입니다",
};

export async function createUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const userPassword = formData.get("userPassword") as string;

  if (!pattern.id.test(userId)) {
    return { target: "userId", message: ERROR_MESSAGES.INVALID_ID };
  }

  if (!pattern.password.test(userPassword)) {
    return { message: ERROR_MESSAGES.INVALID_PASSWORD };
  }

  const hashedPassword = await bcrypt.hash(userPassword, SALT_ROUNDS);

  try {
    const newUser = await prisma.user.create({
      data: {
        name: userId,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    return {
      target: "",
      message: "",
    };
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          message: "이미 등록된 아이디입니다",
        };
      }

      return { message: "사용자 생성 중 오류가 발생했습니다" };
    }
  }

  return { message: "사용자 생성 중 오류가 발생했습니다" };
}
