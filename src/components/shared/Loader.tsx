import React from 'react';
import {LucideLoaderCircle} from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full  h-[500px] flex justify-center items-center">
      <LucideLoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loader;