import React, { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../utils/type-interfaces";

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<null>>;
  position: any;
  errorPos: any;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  position: null,
  errorPos: null
});
