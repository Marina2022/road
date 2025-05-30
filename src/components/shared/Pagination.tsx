import React from 'react';
import {Button} from '../ui/button';

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  setPagination: (pagination: PageAndSize) => void;
  count: number;
  hasNext: boolean;
}

const Pagination = ({pagination, setPagination, count, hasNext}: PaginationProps) => {
 
  const pages = Array.from({length: pagination.size})

  const handleClick = (index: number) => {
    setPagination({
      ...pagination,
      page: index
    })
  }

  const startOffset = pagination.page * pagination.size + 1
  const endOffset = (pagination.page + 1) * pagination.size
  const actualEndOffset = Math.min(endOffset, count)
  
  
  const label = `${startOffset} -  ${actualEndOffset} of ${count}`

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    })
  }
  
  const handlePrev = () => {
    setPagination({
      ...pagination,
      page: pagination.page -1,
    })
  }

  const prevButton = (
    <Button onClick={handlePrev} variant="outline" disabled={pagination.page < 1}>Previous</Button>
  )
  
  const nextButton = (
    <Button onClick={handleNext} variant="outline" disabled={!hasNext }>Next</Button>
  )

  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
      
      <div className="flex gap-4">
        {prevButton}
        {
          pages.map((page, index) => {
            return (
              <button className="w-9 h-9 border rounded-md" key={index} onClick={() => handleClick(index)}>{index + 1}</button>
            )
          })
        }
        {nextButton}
      </div>
    </div>
  )
}

export default Pagination;  