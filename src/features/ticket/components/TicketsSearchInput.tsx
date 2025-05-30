'use client'

import React from 'react';
import SearchInput from "@/components/shared/SearchInput";
import {useQueryState, useQueryStates} from "nuqs";
import {paginationOptions, paginationParser, searchParser} from "@/features/ticket/search-params";

type TicketsSearchProps = {
  placeholder: string
}

const TicketsSearchInput = ({placeholder}: TicketsSearchProps) => {
   
  const [search, setSearch] = useQueryState("search", searchParser)
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);
  
  return <SearchInput 
    placeholder={placeholder} 
    search={search} 
    setSearch={setSearch}
    setPagination={setPagination} 
    pagination={pagination}
  />
};

export default TicketsSearchInput;