import React from 'react';
import {ThemeProvider} from "next-themes";
import {Toaster} from "sonner";
import {NuqsAdapter} from 'nuqs/adapters/next/app'

const Providers = ({children}: { children: React.ReactNode }) => {
  return (

    <ThemeProvider attribute="class"
                   defaultTheme="system"
                   enableSystem
      // disableTransitionOnChange
    >
      <NuqsAdapter>
        {children}
      </NuqsAdapter>

      <Toaster expand/>
    </ThemeProvider>
  );
};

export default Providers;