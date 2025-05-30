'use client'

import React from 'react';
import {Input} from "@/components/ui/input";
import {useDebouncedCallback} from "use-debounce";

type SearchInputProps = {
  placeholder: string;
  search: string;
  setSearch: (search: string) => void;
  pagination: { size: number, page: number },
  setPagination: (pagination: { size: number, page: number }) => void;
}

const SearchInput = ({placeholder, search, setSearch, setPagination, pagination}: SearchInputProps) => {
  const handleChange = useDebouncedCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value)
    setPagination({
      ...pagination,
      page: 0
    })

  }, 300)

  return (
    <div className="mb-10 w-full max-w-[420px] mt-10">
      <Input onChange={handleChange} placeholder={placeholder} defaultValue={search}/>
    </div>
  );
};

export default SearchInput;