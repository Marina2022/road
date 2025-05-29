import React from "react";

export type NavItem = {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  href: string;
  separator?: boolean;
}

