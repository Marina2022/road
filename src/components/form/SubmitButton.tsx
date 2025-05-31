'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";

const SubmitButton = ({label, className = '', variant = "default", icon}: {
  label?: string,
  className?: string,
  icon?: React.ReactElement,
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}) => {

  const {pending} = useFormStatus()
  
  const showingValue = label ?? icon

  
  return (
    <Button disabled={pending} variant={variant} className={`cursor-pointer ${className}`} type="submit">{pending ?
      <LoaderCircle className="animate-spin"/> : showingValue}
    </Button>
  );
};

export default SubmitButton;