"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Badge from "./Badge";
import IconArrowDown from "@/assets/icons/arrowDown";
import IconLoading from "@/assets/icons/loading";
import usePrevious from "@/hooks/usePrevious";

interface IProps<T> {
  options: (T & { id: number; name: string })[];
  optionRender: (item: T) => JSX.Element;
  onChangeText: (value: string) => void;
  onSelectOptions: (items: T[]) => void;
  isError: boolean;
  isFetching: boolean;
  placeholder?: string;
}

export default function MultiSelect<T>({
  options,
  optionRender,
  onChangeText,
  onSelectOptions,
  placeholder,
  isError,
  isFetching,
}: IProps<T>) {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<typeof options>([]);
  const previousSelectedOptions = usePrevious(selectedOptions);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (previousSelectedOptions !== selectedOptions) {
      onSelectOptions(selectedOptions);
    }
  }, [onSelectOptions, selectedOptions, previousSelectedOptions]);

  const handleSelect = (item: (typeof options)[number]) => {
    let newSelectedOptions = selectedOptions;

    const isOptionSelected = !!selectedOptions.find((o) => o.id === item.id);
    if (isOptionSelected) {
      newSelectedOptions = selectedOptions.filter((o) => o.id !== item.id);
    } else {
      newSelectedOptions = [...newSelectedOptions, item];
    }

    setSelectedOptions(newSelectedOptions);
  };

  const handleDeleteSelected = (id: number) => {
    setSelectedOptions(selectedOptions.filter((o) => o.id !== id));
  };

  return (
    <div ref={containerRef} className="relative bg-white">
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex w-full justify-between items-center rounded-xl border border-gray-600 p-3"
      >
        <div className="flex flex-row flex-wrap">
          {selectedOptions.map((selectedOption) => (
            <div className="w-min mr-4" key={selectedOption.id}>
              <Badge
                id={selectedOption.id}
                label={selectedOption.name}
                handleDeleteSelected={handleDeleteSelected}
              />
            </div>
          ))}
          <input
            type="text"
            placeholder={placeholder}
            className="outline-none w-min mx-4"
            onChange={(e) => onChangeText(e.target.value)}
            onFocus={() => setOpen(true)}
          />
        </div>
        <div className="flex items-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {isFetching ? (
              <IconLoading className="fill-gray-700 w-5 h-5 animate-spin" />
            ) : (
              <IconArrowDown className="fill-gray-700 w-5 h-5" />
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="mt-2 rounded-xl border border-gray-600 overflow-auto max-h-96 w-full absolute bg-white">
          {isError ? (
            <div className="p-3">No Options!</div>
          ) : (
            <ul
              className={twMerge("flex flex-col", isFetching ? "blur-sm" : "")}
            >
              {options.map((item) => {
                const isOptionSelected = !!selectedOptions.find(
                  (o) => o.id === item.id
                );

                return (
                  <li
                    role="button"
                    key={item.id}
                    tabIndex={0}
                    onClick={() => handleSelect(item)}
                    onKeyDown={(e) => {
                      if (e.code === "Space" || e.code === "Enter") {
                        e.preventDefault();
                        handleSelect(item);
                      }
                    }}
                    className="flex space-x-3 p-3 border-b last:border-none border-gray-600 cursor-pointer active:outline outline-blue-500"
                  >
                    <>
                      <input
                        type="checkbox"
                        tabIndex={-1}
                        checked={isOptionSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelect(item);
                        }}
                      />
                      {optionRender(item)}
                    </>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
