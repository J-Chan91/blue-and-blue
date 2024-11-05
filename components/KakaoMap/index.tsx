import { useEffect } from "react";

import SearchSection from "./SearchSection";

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  geolocation: GeolocationPosition | null;
};

/**
 * `<script>` 태그에 속성을 부여합니다.
 */
function kakaoMapLoad(srcElement: HTMLScriptElement) {
  srcElement.async = false;
  srcElement.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=2450696ea560c23ccf7112c36158d312&autoload=false&libraries=services";

  document.head.appendChild(srcElement);
}

export default function KakaoMap({ geolocation }: Props) {
  useEffect(() => {
    if (!geolocation) {
      return;
    }

    const kakaoMapScript = document.createElement("script");

    kakaoMapLoad(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("k-map");

        const center = new window.kakao.maps.LatLng(
          geolocation?.coords.latitude,
          geolocation?.coords.longitude,
        );

        new window.kakao.maps.Map(container, {
          center,
          level: 3,
        });

        // const marker = new window.kakao.maps.Marker({
        //   position: center,
        //   clickable: true,
        // });

        // marker.setMap(map);

        // // window.kakao.maps.event.addListener(marker, "click", markerClick);

        // const ps = new window.kakao.maps.services.Places();

        // // 키워드로 장소를 검색합니다
        // ps.keywordSearch("연산역 추어탕", placesSearchCB);

        // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        // function placesSearchCB(data: Array<PlaceItem>, status: string) {
        //   if (status === window.kakao.maps.services.Status.OK) {
        //     console.log("data", data);
        //     console.log("status", status);
        //   }
        // }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, [geolocation]);

  return (
    <div className="flex h-[600px] w-full justify-between overflow-hidden">
      <div className="w-1/2 flex-1 overflow-hidden rounded-xl shadow-2xl">
        <div className="h-full w-full" id="k-map" />
      </div>

      <SearchSection geolocation={geolocation} />
    </div>
  );
}
