'use client'

import Link from "next/link";
import {tickets} from "@/data";

export default function Home() {
  
  return (   
      <div className="w-4/5 m-auto mt-3">
        <ul className="grid grid-cols-4 gap-4">
          {
            tickets.map(ticket => <li className="p-2 border mb-2 border-blue-300" key={ticket.id}>
              <p>
                {ticket.title}
              </p>            
              <Link href={`/tickets/${ticket.id}`}>View</Link>
            </li>)
          }
        </ul>
      </div>    
  );
}



