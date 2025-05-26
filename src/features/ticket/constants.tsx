import React from "react";
import CheckIcon from "@/components/icons/CheckIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import PencilIcon from "@/components/icons/PencilIcon";

export const TICKET_ICONS = {
  DONE: <CheckIcon/>,
  OPEN: <DocumentIcon/>,
  IN_PROGRESS: <PencilIcon/>,
}


export const TICKET_LABELS = {
  DONE: "Done",
  OPEN: "Open",
  IN_PROGRESS: "In progress",
}