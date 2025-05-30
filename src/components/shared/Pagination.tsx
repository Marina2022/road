import React from 'react';
import {Button} from '../ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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

  const pages = Array.from({length: count / pagination.size + 1})

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
      page: pagination.page - 1,
    })
  }

  const prevButton = (
    <Button onClick={handlePrev} variant="outline" disabled={pagination.page < 1}>Previous</Button>
  )

  const nextButton = (
    <Button onClick={handleNext} variant="outline" disabled={!hasNext}>Next</Button>
  )

  const handleSelect = (value: string) => {
    setPagination({
      page: 0,
      size: Number(value)
    })

  }

  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-sm text-muted-foreground">
        {label}
      </div>

      <div className="flex items-center gap-10">
        <Select onValueChange={handleSelect} defaultValue={pagination.size.toString()}>
          <SelectTrigger className="w-[70px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2" key="2">2</SelectItem>
            <SelectItem value="5" key="5">5</SelectItem>
            <SelectItem value="10" key="10">10</SelectItem>
            <SelectItem value="50" key="50">50</SelectItem>
            <SelectItem value="100" key="100">100</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-4">
          {prevButton}
          {
            pages.map((page, index) => {
              return (
                <button className="w-9 h-9 border rounded-md" key={index}
                        onClick={() => handleClick(index)}>{index + 1}</button>
              )
            })
          }
          {nextButton}
        </div>
      </div>
    </div>
  )
}

export default Pagination;  