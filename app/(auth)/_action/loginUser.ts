"use server";

import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { pattern } from "@/lib/pattern";

const ERROR_MESSAGES = {
  INVALID_ID: "유효한 아이디가 아닙니다",
  INVALID_PASSWORD: "유효한 비밀번호가 아닙니다",
  LOGIN_FAILED: "아이디 또는 비밀번호가 잘못되었습니다",
  GENERAL_ERROR: "로그인 중 오류가 발생했습니다",
};

function validateInput(userId: string, userPassword: string) {
  if (!pattern.id.test(userId)) {
    return ERROR_MESSAGES.INVALID_ID;
  }

  if (!pattern.password.test(userPassword)) {
    return ERROR_MESSAGES.INVALID_PASSWORD;
  }

  return null;
}

async function findUserAndVerifyPassword(userId: string, userPassword: string) {
  const user = await prisma.user.findUnique({ where: { name: userId } });

  if (!user) {
    return false;
  }

  return bcrypt.compare(userPassword, user.password);
}

export async function loginUser(prevState: any, formData: FormData) {
  const userId = formData.get("userId") as string;
  const userPassword = formData.get("userPassword") as string;

  const validationError = validateInput(userId, userPassword);
  if (validationError) {
    return { message: validationError };
  }

  try {
    const isAuthenticated = await findUserAndVerifyPassword(
      userId,
      userPassword,
    );

    if (isAuthenticated) {
      return { message: "success" };
    } else {
      return { message: ERROR_MESSAGES.LOGIN_FAILED };
    }
  } catch (err) {
    console.error("Login error:", err);

    return { message: ERROR_MESSAGES.GENERAL_ERROR };
  }
}
