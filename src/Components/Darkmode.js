import React, { useState} from 'react';


export const themes = {
  dark: {
    color: "#ffffff",
    background: "#222222"
  }
};  

export const ThemeContext = React.createContext({
  theme: themes.dark
});

export const ThemeProvider = ({children}) => {
  const [switched, setSwitched] = useState(false);

  const toggle = () => {
    setSwitched(switched === false ? themes.dark : false)
  }
  return (
        
    <ThemeContext.Provider value={{switched, toggle}} >
      {children}   
        
    </ThemeContext.Provider>       
        
  )
}



