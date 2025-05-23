'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";

const SubmitButton = ({label, className}: { label: string, className:string }) => {

  const {pending} = useFormStatus()

  return (
    <Button className={className} type="submit">{pending ? <LoaderCircle className="animate-spin"/> : label}</Button>
  );
};

export default SubmitButton;