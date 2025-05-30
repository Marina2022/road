'use client'

import React from 'react';
import {useQueryStates} from "nuqs";
import {sortOptions, sortParser} from "@/features/ticket/search-params";
import Sort from "@/components/shared/Sort";

type TicketsSortProps = {
  options: {
    label: string;
    sortValue: string;
    sortKey: string;
  }[]
}

const TicketsSort = ({options}: TicketsSortProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions)
  
  
  return <Sort options={options} sort={sort} setSort={setSort} />
}

export default TicketsSort;