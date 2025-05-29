import {NavItem} from "@/components/layout/sidebar/sidebar-types";
import {Book, CircleUser, Library} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <Library/>,
    href: '/'
  },
  {
    title: "My Tickets",
    icon: <Book/>,
    href: '/tickets'
  },
  {
    separator: true,
    title: "Account",
    icon: <CircleUser/>,
    href: '/account/profile'
  }
]