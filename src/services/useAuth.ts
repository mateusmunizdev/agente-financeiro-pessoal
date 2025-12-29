import { useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import type { Session } from "@supabase/supabase-js";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);
  const [loadingRole, setLoadingRole] = useState<boolean>(true);

  // sessão inicial + listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoadingSession(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // regra de admin (exemplo simples)
  useEffect(() => {
    if (!session) {
      setAdmin(false);
      setLoadingRole(false);
      return;
    }

    setAdmin(session.user.email === "admin@email.com");
    setLoadingRole(false);
  }, [session]);

  // 🔐 LOGIN
  async function signIn(email: string, password: string): Promise<void> {
    setLoadingSession(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error){
        setLoadingSession(false)
      throw error;
     
    }
   
  setLoadingSession(false)
    setSession(data.session)
  }

  // 🆕 CADASTRO
  async function signUp(email: string, password: string, nome: string): Promise<void> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
    data: {
      nome: nome,
    },
  },
    });

    if (error){
       throw error;
    }

    setSession(data.session)
  }

  // 🚪 LOGOUT
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  return {
    session,
    admin,
    loadingSession,
    loadingRole,
    signIn,
    signUp,
    signOut,
  };
}
