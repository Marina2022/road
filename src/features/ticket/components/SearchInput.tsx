'use client'

import React from 'react';
import {Input} from "@/components/ui/input";
// import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {useQueryState} from "nuqs";
import {searchParser} from "@/features/ticket/search-params";


type SearchInputProps = {
  placeholder: string;
}

const SearchInput = ({placeholder}: SearchInputProps) => {   
  const [search, setSearch] = useQueryState("search", searchParser)
      
  const handleChange = useDebouncedCallback(async(e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value; 
    await setSearch(value)
  }, 300) 
  
  return (
    <div className="mb-10 w-full max-w-[420px] mt-10">
      <Input onChange={handleChange} placeholder={placeholder} defaultValue={search} />      
    </div>
  );
};

export default SearchInput;