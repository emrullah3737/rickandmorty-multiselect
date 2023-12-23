import React from "react";

interface IProps {
  className?: string;
}

export default function IconDelete({ className }: IProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1rem"
      width="1rem"
    >
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224H176a16 16 0 010-32h160a16 16 0 010 32z" />
    </svg>
  );
}
