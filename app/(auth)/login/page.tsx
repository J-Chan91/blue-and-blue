"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { loginUser } from "@/app/(auth)/_action/loginUser";

const initState = {
  message: "",
};

export default function Home() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginUser, initState);

  if (state.message === "success") {
    router.push("/");

    return "";
  }

  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex w-[520px] flex-col gap-2">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-nowrap text-xl font-semibold">로그인</h2>

          <hr className="w-full border-gray-400" />
        </div>

        <form className="flex flex-col gap-4" action={formAction}>
          <div className="flex flex-col gap-2">
            <label className="group block rounded border p-1 transition-all focus-within:border-gray-800 hover:border-gray-400">
              <div className="flex justify-between">
                <span className="text-sm group-focus-within:font-bold">
                  아이디
                </span>
              </div>

              <input
                aria-required="true"
                className="w-full rounded border border-none border-gray-300 py-2 text-sm focus:outline-none"
                name="userId"
                placeholder="아이디 입력"
                type="text"
              />
            </label>

            <label className="group block rounded border p-1 transition-all focus-within:border-gray-800 hover:border-gray-400">
              <span className="text-sm group-focus-within:font-bold">
                비밀번호
              </span>

              <input
                aria-required="true"
                className="w-full rounded border border-none border-gray-300 py-2 text-sm focus:outline-none"
                name="userPassword"
                placeholder="비밀번호 입력"
                type="password"
              />
            </label>

            <div className="h-6">
              {state?.message && (
                <span className="text-sm text-red-500">{state.message}</span>
              )}
            </div>
          </div>

          <Button type="submit">로그인</Button>
        </form>

        <Link
          className="mt-1 flex h-9 w-full items-center justify-center text-center align-middle text-sm underline underline-offset-2 hover:font-semibold"
          href="/register"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
}
