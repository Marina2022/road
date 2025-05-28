
import React from 'react';
import {ThemeProvider} from "next-themes";
import {Toaster} from "sonner";

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute="class"
                   defaultTheme="system"
                   enableSystem
                   // disableTransitionOnChange
    >
      {children}

      <Toaster expand/>      
    </ThemeProvider>
  );
};

export default Providers;