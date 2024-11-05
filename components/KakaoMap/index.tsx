import { useState } from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import useGeolocation from "@/hooks/useGeolocation";
import { MarkersItem } from "@/types/KakaoMapTypes";
import SearchSection from "./SearchSection";

export default function KakaoMap() {
  const [markers, setMarkers] = useState<Array<MarkersItem> | null>(null);
  const [map, setMap] = useState<kakao.maps.Map>();

  const [geolocation] = useGeolocation();
  useKakaoLoader({
    appkey: "2450696ea560c23ccf7112c36158d312",
    libraries: ["services"],
  });

  const markersUpdate = (_markers: Array<MarkersItem>) => {
    if (!map) return;

    console.log(_markers);

    setMarkers(_markers);

    console.log(markers);
    // map.setBounds()
  };

  // useEffect(() => {
  //   if (!geolocation) {
  //     return;
  //   }

  //   const kakaoMapScript = document.createElement("script");

  //   kakaoMapLoad(kakaoMapScript);

  //   const onLoadKakaoAPI = () => {
  //     window.kakao.maps.load(() => {
  //       const container = document.getElementById("k-map");

  //       const center = new window.kakao.maps.LatLng(
  //         geolocation?.coords.latitude,
  //         geolocation?.coords.longitude,
  //       );

  //       new window.kakao.maps.Map(container, {
  //         center,
  //         level: 3,
  //       });

  //       // const marker = new window.kakao.maps.Marker({
  //       //   position: center,
  //       //   clickable: true,
  //       // });

  //       // marker.setMap(map);

  //       // // window.kakao.maps.event.addListener(marker, "click", markerClick);

  //       // const ps = new window.kakao.maps.services.Places();

  //       // // 키워드로 장소를 검색합니다
  //       // ps.keywordSearch("연산역 추어탕", placesSearchCB);

  //       // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  //       // function placesSearchCB(data: Array<PlaceItem>, status: string) {
  //       //   if (status === window.kakao.maps.services.Status.OK) {
  //       //     console.log("data", data);
  //       //     console.log("status", status);
  //       //   }
  //       // }
  //     });
  //   };

  //   kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  // }, [geolocation]);

  return (
    <div className="flex h-full gap-4 max-md:flex-col">
      {geolocation && (
        <Map
          id="kakao-map-container"
          center={{
            lat: geolocation.coords.latitude,
            lng: geolocation.coords.longitude,
          }}
          style={{
            width: "100%",
            height: "520px",
          }}
          level={3}
          onCreate={(map) => setMap(map)}
        />
      )}

      <SearchSection onMarkersUpdate={markersUpdate} />
    </div>
    // <div className="flex h-[600px] w-full justify-between max-md:h-[calc(100vh-100px)] max-md:flex-col max-md:justify-start max-md:gap-4">
    //   <div className="h-full w-full overflow-hidden rounded-xl shadow-2xl max-md:min-h-[520px] max-md:w-full">
    //     <div className="h-full w-full" id="k-map" />
    //   </div>

    // </div>
  );
}
