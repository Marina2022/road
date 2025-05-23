"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import * as React from "react"
import {Button} from "../ui/button";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils"
import { format } from "date-fns"
import {Calendar} from "@/components/ui/calendar";

const DatePicker = () => {

  const [date, setDate] = React.useState<Date>()
  
  return (
    // <DayPicker animate captionLayout="label" mode="range" showOutsideDays weekStartsOn={1} />

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


export default DatePicker