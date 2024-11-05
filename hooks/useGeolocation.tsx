import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(
    null,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeolocation(pos);
    });
  }, []);

  return [geolocation];
}
