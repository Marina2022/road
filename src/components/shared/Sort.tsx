'use client'
import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type SortProps = {
  options: {
    label: string;
    sortValue: string;
    sortKey: string;
  }[],
  sort: {sortKey: string, sortValue: string};
  setSort: (sort: {sortKey: string, sortValue: string}) => void;  
}


const Sort = ({options, sort, setSort}: SortProps) => {

  const handleSelect = (value: string) => {
    const sortKey = value.split(',')[0]
    const sortValue = value.split(',')[1]
    
    setSort({
      sortKey, sortValue
    });
   
  }

  return (
    <div className="mb-10 w-full mt-10 border">
      <Select onValueChange={handleSelect} defaultValue={sort.sortKey + ',' + sort.sortValue}>
        <SelectTrigger className="w-full">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          {
            options.map((option) => {
              return <SelectItem
                value={option.sortKey + "," + option.sortValue}
                key={option.sortKey + "," + option.sortValue}
              > {option.label}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
    </div>
  )    
}

export default Sort;