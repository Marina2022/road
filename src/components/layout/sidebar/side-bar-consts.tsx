import {NavItem} from "@/components/layout/sidebar/sidebar-types";
import {Book, Library} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <Library />,
      href: '/'
      },
      {
        title: "My Tickets",
        icon: <Book/>,
        href: '/tickets'
      },
      ]