'use client'
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useQueryState} from "nuqs";
import {searchParser, sortParser} from "@/features/ticket/search-params";

type SortTicketsProps = {
  options: {
    label: string;
    value: string;
  }[]
}

const SortTickets = ({options}: SortTicketsProps) => {

  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  // const {replace} = useRouter();
  // const pathname = usePathname();  
  // const value = params.get('sort') || undefined;

  const [sort, setSort] = useQueryState("sort", sortParser)
  
  const handleSelect = (value: string) => {
    // params.set("sort", value);
    // replace(`${pathname}?${params.toString()}`, {scroll: false})

    setSort(value);
  }

  
  
  return (
    <div className="mb-10 w-full mt-10 border">

      <Select onValueChange={handleSelect} defaultValue={sort}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            options.map((option) => {
              return <SelectItem
                value={option.value}                
                key={option.value}
              > {option.label}</SelectItem>
            })
          }

        </SelectContent>
      </Select>


    </div>
  )
    ;
};

export default SortTickets;