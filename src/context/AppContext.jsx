import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const [isLoggedin, setIsLoggedin] = useState(false);
   const [loader, setLoader] = useState(false);

   return <AppContext.Provider value={{ isLoggedin, setIsLoggedin, loader, setLoader }}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
