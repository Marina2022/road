'use client'

import {Moon, Sun} from "lucide-react";
import {useTheme} from 'next-themes'
import React from 'react';


const ToggleTheme = () => {

  const {theme, setTheme} = useTheme()

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div>
      <button onClick={handleTheme} className="cursor-pointer">        
        {
          theme === 'dark' ? <Sun /> : <Moon /> 
        }               
      </button>
    </div>
  );
};

export default ToggleTheme;