import React, { createContext, useContext, useReducer } from "react";
import { type UserDetails } from "../types/user";
interface User {
  token: string,
  userDetails: UserDetails
}

type Action =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

function userReducer(state: User | null, action: Action): User | null {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

interface UserContextType {
  user: User | null;
  dispatch: React.Dispatch<Action>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside UserProvider");
  }
  return ctx;
};