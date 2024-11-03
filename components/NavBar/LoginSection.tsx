import Link from "next/link";

export default function LoginSection() {
  return (
    <Link
      className="text-sm hover:underline hover:underline-offset-4"
      href="/signin"
    >
      로그인
    </Link>
  );
}
