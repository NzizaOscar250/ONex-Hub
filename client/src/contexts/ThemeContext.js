// import {  Component, createContext } from 'react'

// export const ThemeContext = createContext();

// export default class ThemeContextProvider extends Component {
//   state = {
//     isLightTheme : true,
//     light:{syntax:'#555',ui:'#ddd',bg:'#eee'},
//     dark:{syntax:'#ddd',ui:'#333',bg:'#555'}
//   }
  
//     render() {
//     return (
//       <ThemeContext.Provider value={{...this.setState}}>
//          {this.props.children}
//       </ThemeContext.Provider>

//     )
//   }
// }


















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
