'use client'

import React from 'react';
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {LoaderCircle} from "lucide-react";

const SubmitButton = ({label, className = '', variant = "default"}: {
  label: string,
  className?: string,
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}) => {

  const {pending} = useFormStatus()

  return (
    <Button disabled={pending} variant={variant} className={className} type="submit">{pending ?
      <LoaderCircle className="animate-spin"/> : label}</Button>
  );
};

export default SubmitButton;