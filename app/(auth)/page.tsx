"use client";

import { useFormState } from "react-dom";

import { Button } from "@/components/ui/button";
import { createUser } from "@/app/(auth)/_action/createUser";

const initState = {
  message: "",
};

export default function Home() {
  const [state, formAction] = useFormState(createUser, initState);

  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex w-[520px] flex-col">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-nowrap text-xl font-semibold">회원가입</h2>

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

          <Button type="submit">회원가입</Button>
        </form>
      </div>
    </main>
  );
}
