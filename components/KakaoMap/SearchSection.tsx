import { HomeIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";

type PlaceItem = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export default function SearchSection() {
  const [searchResultList, setSearchResultList] =
    useState<Array<PlaceItem> | null>(null);

  const { register, handleSubmit } = useForm<{ keyword: string }>();

  function displayMarker(place: PlaceItem) {
    console.log(window.kakao.map, place.x, place.y);

    // 마커를 생성하고 지도에 표시합니다
    new window.kakao.maps.Marker({
      map: window.kakao.map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  }

  const onHandleSubmit = (data: { keyword: string }) => {
    if (!data) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(data.keyword, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: Array<PlaceItem>, status: string) {
      console.log(data);

      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResultList(data);

        data.forEach((item) => displayMarker(item));
      }
    }
  };

  return (
    <div className="flex w-1/2 flex-col px-4">
      <form className="flex gap-2" onSubmit={handleSubmit(onHandleSubmit)}>
        <input
          className="w-full rounded-md border border-gray-400 px-4 py-1 text-sm"
          placeholder="입력해봐"
          {...register("keyword")}
        />

        <Button type="submit">검색</Button>
      </form>

      <hr className="my-4" />

      <ul className="flex h-full flex-col gap-2 overflow-y-auto rounded border">
        {searchResultList?.map((item) => (
          <li
            className="flex cursor-default items-center justify-between p-2 transition-all hover:bg-gray-200"
            key={item.id}
          >
            <div className="flex flex-col">
              <span className="text-sm">{item.place_name}</span>

              <span className="text-xs text-gray-400">
                {item.road_address_name}
              </span>
            </div>

            <a href={item.place_url} target="_blank">
              <HomeIcon color="#222222" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
