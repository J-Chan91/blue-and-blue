import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useGeolocation from "@/hooks/useGeolocation";
import SearchSection from "./SearchSection";

export default function KakaoMap() {
  const [zoomLevel, setZoomLevel] = useState(3);
  const [markers, setMarkers] =
    useState<kakao.maps.services.PlacesSearchResult | null>(null);
  const [map, setMap] = useState<kakao.maps.Map>();

  const [geolocation, geoLocationUpdate] = useGeolocation();

  const markersUpdate = (_markers: kakao.maps.services.PlacesSearchResult) => {
    if (!map) return;

    setMarkers(_markers);

    // map.setBounds()
  };

  const zoomChange = (zoom: kakao.maps.Map) => {
    setZoomLevel(zoom.getLevel());
  };

  const centerChange = (map: kakao.maps.Map) => {
    geoLocationUpdate({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  return (
    <div className="flex h-full gap-4 max-md:flex-col">
      {geolocation && (
        <Map
          id="kakao-map-container"
          center={{
            lat: geolocation.lat,
            lng: geolocation.lng,
          }}
          style={{
            width: "100%",
            height: "520px",
          }}
          level={zoomLevel}
          onCreate={(map) => setMap(map)}
          onZoomChanged={zoomChange}
          onCenterChanged={centerChange}
        >
          {markers?.map((marker) => (
            <MapMarker
              key={`${marker.id}-${marker.x}-${marker.y}`}
              position={{ lat: Number(marker.y), lng: Number(marker.x) }}
            />
          ))}
        </Map>
      )}

      <SearchSection
        geolocation={geolocation}
        zoomLevel={zoomLevel}
        onMarkersUpdate={markersUpdate}
      />
    </div>
  );
}
