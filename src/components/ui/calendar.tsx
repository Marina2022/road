// "use client"
//
// import * as React from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"
//
// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"
//
// function Calendar({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: React.ComponentProps<typeof DayPicker>) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3", className)}
//       classNames={{
//         months: "flex flex-col sm:flex-row gap-2",
//         month: "flex flex-col gap-4",
//         caption: "flex justify-center pt-1 relative items-center w-full",
//         caption_label: "text-sm font-medium",
//         nav: "flex items-center gap-1",
//         nav_button: cn(
//           buttonVariants({ variant: "outline" }),
//           "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-x-1",
//         head_row: "flex",
//         head_cell:
//           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: cn(
//           "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
//           props.mode === "range"
//             ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
//             : "[&:has([aria-selected])]:rounded-md"
//         ),
//         day: cn(
//           buttonVariants({ variant: "ghost" }),
//           "size-8 p-0 font-normal aria-selected:opacity-100"
//         ),
//         day_range_start:
//           "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_range_end:
//           "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
//         day_selected:
//           "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside:
//           "day-outside text-muted-foreground aria-selected:text-muted-foreground",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle:
//           "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ className, ...props }) => (
//           <ChevronLeft className={cn("size-4", className)} {...props} />
//         ),
//         IconRight: ({ className, ...props }) => (
//           <ChevronRight className={cn("size-4", className)} {...props} />
//         ),
//       }}
//       {...props}
//     />
//   )
// }
//
// export { Calendar }



"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

function Calendar({
                    className,
                    classNames,
                    showOutsideDays = true,
                    ...props
                  }: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: `relative flex ${defaultClassNames.month}`,
        month_caption: `relative mx-10 flex h-7 items-center justify-center ${defaultClassNames.month_caption}`,
        weekdays: cn("flex flex-row", classNames?.weekdays),
        weekday: cn(
          "w-8 text-sm font-normal text-muted-foreground",
          classNames?.weekday
        ),
        month: cn("w-full", classNames?.month),

        caption_label: cn(
          "truncate text-sm font-medium",
          classNames?.caption_label
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 [&_svg]:fill-foreground",
          classNames?.button_next
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 [&_svg]:fill-foreground",
          classNames?.button_previous
        ),
        nav: cn("flex items-start", classNames?.nav),
        month_grid: cn("mx-auto mt-4", classNames?.month_grid),
        week: cn("mt-2 flex w-max items-start", classNames?.week),
        day: cn(
          "flex size-8 flex-1 items-center justify-center p-0 text-sm",
          classNames?.day
        ),
        day_button: cn(
          "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
          classNames?.day_button
        ),
        range_start: cn(
          "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-start rounded-s-md",
          classNames?.range_start
        ),
        range_middle: cn(
          "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
          classNames?.range_middle
        ),
        range_end: cn(
          "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-end rounded-e-md",
          classNames?.range_end
        ),
        selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
          classNames?.selected
        ),
        today: cn(
          "[&>button]:bg-accent [&>button]:text-accent-foreground",
          classNames?.today
        ),
        outside: cn(
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          classNames?.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", classNames?.disabled),
        hidden: cn("invisible flex-1", classNames?.hidden),
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };