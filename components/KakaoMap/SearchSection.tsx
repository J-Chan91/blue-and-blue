import { HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useDebounce from "@/hooks/useDebounce";
import { Button } from "../ui/button";

type Props = {
  geolocation: { lat: number; lng: number } | null;
  zoomLevel: number;
  onMarkersUpdate: (_markers: kakao.maps.services.PlacesSearchResult) => void;
};

export default function SearchSection({
  geolocation,
  zoomLevel,
  onMarkersUpdate,
}: Props) {
  const [searchResultList, setSearchResultList] =
    useState<kakao.maps.services.PlacesSearchResult>([]);

  const debounceValue = useDebounce<{ lat: number; lng: number } | null>(
    geolocation,
    2000,
  );
  const { register, handleSubmit, getValues } = useForm<{ keyword: string }>();

  const onHandleSubmit = ({ keyword }: { keyword: string }) => {
    if (!keyword || !geolocation) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const location = new kakao.maps.LatLng(geolocation.lat, geolocation.lng);

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          onMarkersUpdate(data);
          setSearchResultList(data);
        }
      },
      {
        location,
        radius: zoomLevel * 1500,
      },
    );
  };

  useEffect(() => {
    const keyword = getValues("keyword");

    if (!keyword) {
      return;
    }

    console.log("updated debounce", keyword);

    onHandleSubmit({ keyword });
  }, [debounceValue]);

  return (
    <div className="flex w-1/2 flex-col px-4 max-md:h-full max-md:w-full">
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
