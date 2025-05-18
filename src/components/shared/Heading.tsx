import React from 'react';
import {Separator} from "@/components/ui/separator";

type HeadingProps = { title: string, text?: string }

const Heading = ({title, text}: HeadingProps) => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      <p className="mb-4">{text}</p>
      <Separator className="mb-5"/>
    </>
  );
};

export default Heading;