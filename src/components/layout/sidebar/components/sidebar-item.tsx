import React, {cloneElement} from 'react';
import {NavItem} from "@/components/layout/sidebar/sidebar-types";
import {usePathname} from "next/navigation";
import Link from 'next/link';
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
}

const SidebarItem = ({isOpen, navItem}: SidebarItemProps) => {
  const path = usePathname()
  const isActive = path === navItem.href

  return (
    <>
      {
        navItem.separator && <Separator className="my-2" />
      }
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({variant: "ghost"}),
          "group relative flex h-12 justify-start",
          isActive && "bg-muted font-bold hover:bg-muted"
        )}
      >
        {cloneElement(navItem.icon, {
          className: "h-5 w-5"
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200 opacity-100 text-foreground",
            isOpen ? "md-block " : "w-[78px]",
            !isOpen && closedClassName
          )}>
        {navItem.title}
      </span>
      </Link>
    </>
  );
};


const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";

export default SidebarItem;