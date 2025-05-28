"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import * as React from "react"
import {Button} from "../ui/button";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils"

import {format} from "date-fns"
import {Calendar} from "@/components/ui/calendar";
import {useImperativeHandle} from "react";

type DatePickerProps = {
  name: string;
  id: string;
  defaultValue?: string;
  imperativeHandleRef: React.RefObject<{ reset: () => void } | null>;
}

const DatePicker = ({name, id, defaultValue, imperativeHandleRef}: DatePickerProps) => {
  
  const [date, setDate] = React.useState<Date | undefined>(defaultValue ? new Date(defaultValue) : new Date())
  const [open, setOpen] = React.useState(false)

  useImperativeHandle(imperativeHandleRef,
    () => ({
      reset: () => {
        setDate(new Date())
      }
    }))

  
  const formattedDate = date ? format(date, "yyyy-MM-dd") : ""

  return (<>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild id={id}>
          <Button
            variant={"outline"}
            className={cn(
              "w-[100%] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(value) => {
              setDate(value)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={formattedDate}/>
    </>
  )
}


export default DatePicker