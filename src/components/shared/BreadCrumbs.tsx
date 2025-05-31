import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbsProps = {
  breadcrumbs: {
    title: string;
    href?: string;
  } []
}

function BreadCrumbs({breadcrumbs}: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          breadcrumbs.map((breadcrumb, index) => {
            
            if (breadcrumb.href) {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <BreadcrumbItem >
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator/>
                </div>
              )  
            } else {
              return (
                <div key={index} className="flex gap-2 items-center text-foreground">
                  <BreadcrumbItem >
                      {breadcrumb.title}
                  </BreadcrumbItem>                  
                </div>
              )
            }
            
          })
        }


      </BreadcrumbList>
    </Breadcrumb>
  )
}


export default BreadCrumbs;