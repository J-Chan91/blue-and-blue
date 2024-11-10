import { HomeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import LoadingSpinner from "../Loading";

type Props = {
  isExpanded: boolean;
  geolocation: { lat: number; lng: number } | null;
  targetMarker: kakao.maps.services.PlacesSearchResultItem | null;
  zoomLevel: number;
  onMarkerSelect: (_marker: kakao.maps.services.PlacesSearchResultItem) => void;
  onMarkersUpdate: (_markers: kakao.maps.services.PlacesSearchResult) => void;
};

export default function SearchSection({
  isExpanded,
  geolocation,
  targetMarker,
  zoomLevel,
  onMarkersUpdate,
  onMarkerSelect,
}: Props) {
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchResultList, setSearchResultList] =
    useState<kakao.maps.services.PlacesSearchResult>([]);

  const debounceValue = useDebounce<{ lat: number; lng: number } | null>(
    geolocation,
    1000,
  );
  const { register, handleSubmit, getValues } = useForm<{ keyword: string }>();

  const onHandleSubmit = ({ keyword }: { keyword: string }) => {
    if (!keyword || !geolocation) {
      return;
    }

    setIsSearchLoading(true);

    const ps = new window.kakao.maps.services.Places();
    const location = new kakao.maps.LatLng(geolocation.lat, geolocation.lng);

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          onMarkersUpdate(data);
          setSearchResultList(data);
        }

        setIsSearchLoading(false);
      },
      {
        location,
        radius: zoomLevel * 100,
      },
    );
  };

  useEffect(() => {
    const keyword = getValues("keyword");

    if (!keyword) {
      return;
    }

    onHandleSubmit({ keyword });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 overflow-y-auto",
        isExpanded ? "row-span-1" : "row-span-2",
      )}
    >
      <form className="flex gap-2" onSubmit={handleSubmit(onHandleSubmit)}>
        <input
          className="w-full rounded-md border border-gray-400 px-4 py-1 text-sm"
          placeholder="입력해봐"
          {...register("keyword")}
        />

        <Button type="submit">검색</Button>
      </form>

      <ul className="relative flex h-full flex-col gap-2 overflow-y-auto rounded border [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        {isSearchLoading && (
          <li className="absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <LoadingSpinner />
          </li>
        )}

        {searchResultList?.map((item) => (
          <li
            className={cn(
              "flex cursor-default items-center justify-between p-2 transition-all hover:bg-gray-200",
              targetMarker?.id === item.id ? "bg-blue-200" : null,
            )}
            key={item.id}
            onClick={() => onMarkerSelect(item)}
          >
            <div className="flex flex-col">
              <span className="text-sm">{item.place_name}</span>

              <span className="text-xs text-gray-400">
                {!item.road_address_name
                  ? item.address_name
                  : item.road_address_name}
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
