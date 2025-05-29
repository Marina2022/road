'use client'
import React from 'react';
import {Input} from "@/components/ui/input";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type SearchInputProps = {
  placeholder: string;
}

const SearchInput = ({placeholder}: SearchInputProps) => {
  
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {replace}  = useRouter();
  const pathname = usePathname();
  
  const handleChange = async(e: React.ChangeEvent<HTMLInputElement>)=>{    
    const value = e.target.value;
    
    if (value) {
      params.set("search", value);  
    } else {
      params.delete("search");
    }    
    replace(`${pathname}?${params.toString()}`, {scroll: false})
  }
  
  return (
    <div className="mb-10 w-full max-w-[420px] mt-10">
      <Input onChange={handleChange} placeholder={placeholder}/>      
    </div>
  );
};

export default SearchInput;