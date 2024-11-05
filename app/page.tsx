"use client";

import KakaoMap from "@/components/KakaoMap";
import useGeolocation from "@/hooks/useGeolocation";

export default function Home() {
  const [geolocation] = useGeolocation();

  return (
    <main className="px-14 py-4">
      <div>
        <KakaoMap geolocation={geolocation} />
      </div>
    </main>
  );
}
