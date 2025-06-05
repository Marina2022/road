import React from 'react';
import {Separator} from "@/components/ui/separator";

type HeadingProps = {
  title: string,
  text?: string,
  tabs?: React.ReactNode,
  actions?: React.ReactNode,
}

const Heading = ({title, text, tabs, actions}: HeadingProps) => {
  return (
    <>
      {tabs}
      <div className='flex justify-between w-full flex-1'>
        <h1 className="text-3xl font-semibold mb-4">{title}</h1>
        <div className="flex gap-4 items-center">
          {actions}
        </div>
      </div>

      <p className="mb-4">{text}</p>
      <Separator className="mb-5"/>
    </>
  );
};

export default Heading;