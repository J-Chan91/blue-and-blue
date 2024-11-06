"use client";

import KakaoMap from "@/components/KakaoMap";
import LoadingSpinner from "@/components/Loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="h-[calc(100%-92px)] p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <KakaoMap />
      </Suspense>
    </main>
  );
}
