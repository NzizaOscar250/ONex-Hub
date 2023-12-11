import { createContext,useContext,useState } from "react";
const ThemeContext = createContext()

const ThemeProvider = ({children})=>{
    const [theme,setTheme] = useState('light')

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

const useThemeContext = ()=>{
    return useContext(ThemeContext)
}

export {ThemeProvider,useThemeContext}
