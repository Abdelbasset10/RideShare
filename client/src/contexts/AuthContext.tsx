import React, { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../utils/type-interfaces";

interface AuthContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
