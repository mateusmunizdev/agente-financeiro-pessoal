import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";
interface AuthContextType {
  session: Session | null;
  signOut: () => Promise<void>;
  loadingSession: boolean;    
  loadingRole: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);