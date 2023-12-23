import IconDelete from "@/assets/icons/delete";
import React from "react";

interface IProps {
  id: number;
  label: string;
  handleDeleteSelected: (id: number) => void;
}

export default function Badge({ id, label, handleDeleteSelected }: IProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === "Space" || e.code === "Enter") {
          e.preventDefault();
          handleDeleteSelected(id);
        }
      }}
      className="flex items-center space-x-1 whitespace-nowrap active:outline outline-blue-500"
    >
      <span>{label}</span>
      <div className="cursor-pointer" onClick={() => handleDeleteSelected(id)}>
        <IconDelete className="fill-gray-500 w-4 h-4" />
      </div>
    </div>
  );
}
