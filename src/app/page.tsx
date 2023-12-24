"use client";

import MultiSelect from "@/components/MultiSelect";
import OptionCell from "@/components/MultiSelect/OptionCell";
import { useDebounce } from "@/hooks/useDebounce";
import useFetchRickAndMorty from "@/hooks/useFetchRickAndMorty";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const bouncedSearchText = useDebounce(searchText, 500);
  const { list, isError, isFetching } = useFetchRickAndMorty(bouncedSearchText);

  return (
    <div className="m-auto p-4 h-screen max-w-[600px]">
      <MultiSelect<(typeof list)[number]>
        placeholder="Search"
        options={list}
        isError={isError}
        isFetching={isFetching}
        onSelectOptions={(selectedOptions) => {
          console.log(selectedOptions);
        }}
        onChangeText={(value) => setSearchText(value)}
        optionRender={(item) => {
          return (
            <OptionCell
              name={item.name}
              imageUrl={item.image}
              searchText={bouncedSearchText}
              episodeLength={item.episode.length}
            />
          );
        }}
      />
    </div>
  );
}
