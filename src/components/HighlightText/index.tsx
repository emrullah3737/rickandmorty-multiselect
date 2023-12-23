import React from "react";

interface IProps {
  children: string;
  searchText: string;
}

export default function HighlightText({
  children = "",
  searchText = "",
}: IProps) {
  const parts = children.split(new RegExp(`(${searchText})`, "gi"));

  return (
    <>
      {parts.map((part, i) => {
        if (
          searchText.length &&
          part.toLowerCase() === searchText.toLowerCase()
        ) {
          return (
            <span key={i} className="font-extrabold">
              {part}
            </span>
          );
        }

        return part;
      })}
    </>
  );
}
