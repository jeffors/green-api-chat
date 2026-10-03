import { createContext } from "react";
import type { Instance } from "../api/client";

export type AuthContextValue = {
  instance: Instance | null;
  login: (instance: Instance) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
