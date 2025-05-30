'use client'

import React, {useEffect} from 'react';
import {useQueryStates} from "nuqs";
import {paginationOptions, paginationParser} from "@/features/ticket/search-params";
import Pagination from "@/components/shared/Pagination";

const TicketPagination = ({count, hasNext}:{count: number, hasNext: boolean}) => {
  const [pagination, setPagination] = useQueryStates(paginationParser, paginationOptions);   
  return <Pagination pagination={pagination} setPagination={setPagination} count={count} hasNext={hasNext} />  
};

export default TicketPagination;