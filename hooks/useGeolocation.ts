import { useEffect, useState } from "react";

type CoordsType = {
  lat: number;
  lng: number;
};

export default function useGeolocation(): [
  CoordsType | null,
  (coords: CoordsType) => void,
] {
  const [geolocation, setGeolocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const geoLocationUpdate = (coords: CoordsType) => {
    setGeolocation({
      lat: coords.lat,
      lng: coords.lng,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeolocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return [geolocation, geoLocationUpdate];
}
