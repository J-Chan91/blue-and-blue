import { MutableRefObject, useRef } from "react";

export default function useKakaoMapLayout(): [
  MutableRefObject<kakao.maps.Map | null>,
  () => void,
] {
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const resizeUpdate = () => {
    mapRef.current?.relayout();
  };

  return [mapRef, resizeUpdate];
}
