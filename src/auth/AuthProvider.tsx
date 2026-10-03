import { type ReactNode, useState, useCallback, useMemo } from "react";
import type { Instance } from "../api/client";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [instance, setInstance] = useState<Instance | null>(null);

  const login = useCallback((instance: Instance) => setInstance(instance), []);
  const value = useMemo(() => ({ instance, login }), [instance, login]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
