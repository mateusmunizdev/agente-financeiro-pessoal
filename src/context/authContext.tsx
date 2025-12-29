import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";
interface AuthContextType {
  session: Session | null;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  admin: boolean;
  loadingSession: boolean;    
  loadingRole: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);