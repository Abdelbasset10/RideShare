import React, { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextProps {
  user: null;
  setUser: Dispatch<SetStateAction<null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
