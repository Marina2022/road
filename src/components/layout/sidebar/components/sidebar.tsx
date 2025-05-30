'use client'

import React, {useState} from 'react';
import {navItems} from "@/components/layout/sidebar/side-bar-consts";
import SidebarItem from "@/components/layout/sidebar/components/sidebar-item";
import {cn} from "@/lib/utils";
import {getClosestString} from "@/utils/levenstein";

const Sidebar = () => {
  
  // const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    // setTransition(true);
    setOpen(open);
    // setTimeout(() => setTransition(false), 200)
  }

 
  const allLinks = navItems.map((navItem) => navItem.href)
  
  return (
    <nav
      className={cn(
        "min-h-full border-r pt-24 absolute bg-background ",
        // isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px] duration-200" : "w-[78px] duration-200"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {
            navItems.map((navItem) => (
              <SidebarItem key={navItem.title} isOpen={isOpen} navItem={navItem} allLinks={allLinks} />
            ))
          }
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;