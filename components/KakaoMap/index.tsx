import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import useGeolocation from "@/hooks/useGeolocation";
import useKakaoMapLayout from "@/hooks/useKakaoMapLayout";
import { cn } from "@/lib/utils";
import SearchSection from "./SearchSection";

export default function KakaoMap() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(3);
  const [markers, setMarkers] =
    useState<kakao.maps.services.PlacesSearchResult | null>(null);
  const [map, setMap] = useState<kakao.maps.Map>();

  const [geolocation, geoLocationUpdate] = useGeolocation();
  const [mapRef, resizeUpdate] = useKakaoMapLayout();

  const markersUpdate = (_markers: kakao.maps.services.PlacesSearchResult) => {
    if (!map) return;

    setMarkers(_markers);

    // map.setBounds()
  };

  const mapResize = () => {
    setIsExpanded(!isExpanded);
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

  useEffect(() => {
    resizeUpdate();
  }, [isExpanded]);

  return (
    <div className="flex h-full gap-4 max-md:flex-col">
      {geolocation && (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Map
            ref={mapRef}
            id="kakao-map-container"
            className="relative overflow-hidden rounded-xl shadow-lg"
            center={{
              lat: geolocation.lat,
              lng: geolocation.lng,
            }}
            style={{
              width: "100%",
              height: isExpanded ? "100%" : "520px",
            }}
            level={zoomLevel}
            onCreate={(map) => setMap(map)}
            onZoomChanged={zoomChange}
            onTileLoaded={centerChange}
          >
            {markers?.map((marker) => (
              <MapMarker
                key={`${marker.id}-${marker.x}-${marker.y}`}
                position={{ lat: Number(marker.y), lng: Number(marker.x) }}
              />
            ))}
          </Map>

          <svg
            className={cn(
              "absolute right-1 z-10 cursor-pointer rounded-full bg-white text-gray-800",
              isExpanded ? "bottom-1" : "bottom-110",
            )}
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={mapResize}
          >
            <path
              d="M7.1813 1.68179C7.35704 1.50605 7.64196 1.50605 7.8177 1.68179L10.3177 4.18179C10.4934 4.35753 10.4934 4.64245 10.3177 4.81819C10.142 4.99392 9.85704 4.99392 9.6813 4.81819L7.9495 3.08638L7.9495 11.9136L9.6813 10.1818C9.85704 10.0061 10.142 10.0061 10.3177 10.1818C10.4934 10.3575 10.4934 10.6424 10.3177 10.8182L7.8177 13.3182C7.73331 13.4026 7.61885 13.45 7.4995 13.45C7.38015 13.45 7.26569 13.4026 7.1813 13.3182L4.6813 10.8182C4.50557 10.6424 4.50557 10.3575 4.6813 10.1818C4.85704 10.0061 5.14196 10.0061 5.3177 10.1818L7.0495 11.9136L7.0495 3.08638L5.3177 4.81819C5.14196 4.99392 4.85704 4.99392 4.6813 4.81819C4.50557 4.64245 4.50557 4.35753 4.6813 4.18179L7.1813 1.68179Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      <SearchSection
        geolocation={geolocation}
        zoomLevel={zoomLevel}
        onMarkersUpdate={markersUpdate}
      />
    </div>
  );
}
