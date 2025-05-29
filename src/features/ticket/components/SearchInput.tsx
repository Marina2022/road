'use client'
import React from 'react';
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

type SearchInputProps = {
  placeholder: string;
}

const SearchInput = ({placeholder}: SearchInputProps) => {
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {replace}  = useRouter();
  const pathname = usePathname();
  
  const value = params.get('search');
  
  const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, {scroll: false})
  }, 300) 
  
  return (
    <div className="mb-10 w-full max-w-[420px] mt-10">
      <Input onChange={handleChange} placeholder={placeholder} defaultValue={value || ''} />      
    </div>
  );
};

export default SearchInput;