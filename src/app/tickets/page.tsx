import clsx from "clsx";
import Link from "next/link";
import CheckIcon from "@/components/icons/CheckIcon";
import DocumentIcon from "@/components/icons/DocumentIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import {tickets} from "@/data";

export default function Tickets() {

  const TICKET_ICONS = {
    DONE: <CheckIcon/>,
    OPEN: <DocumentIcon/>,
    IN_PROGRESS: <PencilIcon/>,
  }


  return (
    <div className="w-4/5 m-auto mt-3">
      <ul className="grid grid-cols-4 gap-4 animate-fade-in ">
        {
          tickets.map(ticket => <li className="p-4 shadow-lg border mb-2 border-slate-100 rounded" key={ticket.id}>
            <p>{TICKET_ICONS[ticket.status]}</p>
            <p className={clsx("text-muted-foreground mt-2", {"line-through": ticket.status === 'DONE'})}>
              {ticket.title}
            </p>
            {/*<Button variant="ghost">Ghost</Button>*/}
            <Link className="text-sm underline" href={`/tickets/${ticket.id}`}>View</Link>
          </li>)
        }
      </ul>
    </div>
  )
}



