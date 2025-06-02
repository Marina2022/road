import React from 'react';
import {ThemeProvider} from "next-themes";
import {Toaster} from "sonner";
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import ReactQueryProvider from "@/providers/react-query-provider";

const Providers = ({children}: { children: React.ReactNode }) => {
  return (

    <ThemeProvider attribute="class"
                   defaultTheme="system"
                   enableSystem
      // disableTransitionOnChange
    >
      <NuqsAdapter>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </NuqsAdapter>

      <Toaster expand/>
    </ThemeProvider>
  );
};

export default Providers;