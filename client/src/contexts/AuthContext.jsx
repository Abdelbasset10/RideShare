import React, { createContext, useState } from "react";


const initialState = {
  user: {},
  setUser: () => {}
}
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(initialState.user);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


