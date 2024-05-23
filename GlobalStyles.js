import { createContext, useContext } from "react";
import { StyleSheet } from "react-native";

const GlobalStyleContext = createContext();
export const useGlobalStyle = () => useContext(GlobalStyleContext);

export const GlobalStyleProvider = ({ children }) => {
    const globalFontStyle = StyleSheet.create({
      globalFont: {
        fontFamily: 'BMDANIEL-Bold',
      },
    });
    
    return (
        <GlobalStyleContext.Provider value={globalFontStyle}>
          {children}
        </GlobalStyleContext.Provider>
      );
    };