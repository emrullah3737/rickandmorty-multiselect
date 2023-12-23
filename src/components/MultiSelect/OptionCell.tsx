import Image from "next/image";
import React from "react";
import HighlightText from "../HighlightText";

interface IProps {
  imageUrl: string;
  searchText: string;
  name: string;
  episodeLength: number;
}

export default function OptionCell({
  episodeLength,
  imageUrl,
  name,
  searchText,
}: IProps) {
  return (
    <>
      <Image
        src={imageUrl}
        alt={name}
        width={40}
        height={40}
        className="rounded-xl w-auto h-auto"
      />
      <div className="flex flex-col space-y-1 max-w-[60%]">
        <span className="text-gray-700 text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
          <HighlightText searchText={searchText}>{name}</HighlightText>
        </span>
        <span className="text-gray-600 text-sm">{episodeLength} Episodes</span>
      </div>
    </>
  );
}
