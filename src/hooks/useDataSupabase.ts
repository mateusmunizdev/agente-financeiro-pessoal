import { supabase } from "../constants/supabase";
import { useContext, useEffect, useState } from "react";
import type { Lancamentos } from "../types/types";
import { AuthContext } from "../context/authContext";

export const useDataSupabase = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSupabase, setDataSupabase] = useState<Lancamentos[]>([]);
  const auth = useContext(AuthContext);
  const user = auth?.session?.user;

  
  async function getData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lancamentos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar dados", error);
        setDataSupabase([]);
        return;
      } else {
        setDataSupabase(data ?? []);
      }
    } catch (error) {
      console.warn(error);
      setDataSupabase([]);
    } finally {
      setLoading(false);
    }
  }

  const registerLounch = async (lancamento: Lancamentos) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lancamentos")
        .insert([lancamento])
        .select("*");
      if (error) {
        console.error("Erro ao inserir lançamento:", error);
        throw error;
      }

      getData();

      return data;
    } catch (error) {
      console.error("Erro ao inserir lançamento:", error);
      return null;
    }
  };

  const deleteLounch = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("lancamentos")
        .delete()
        .eq("id", id)
        .select("*");
      if (error) {
        console.error("Erro ao deletar lançamento:", error);
        throw error;
      }

      getData();

      return data;
    } catch (error) {
      console.error("Erro ao deletar lançamento:", error);
      return null;
    }
  };


const updateLounch = async (id: string, updatedData: Lancamentos) => {
    setLoading(true);   
    try {
      const { data, error } = await supabase
        .from("lancamentos")  
        .update(updatedData)
        .eq("id", id)
        .select("*"); 
      if (error) {
        console.error("Erro ao atualizar lançamento:", error);
        throw error;
      }
      getData();

      return data;
    } catch (error) {
      console.error("Erro ao atualizar lançamento:", error);
      return null;
    }
  };




  useEffect(() => {

if(!user){
      setDataSupabase([]);
      setLoading(false);
      return;
    }
    getData();
  }, [user]);

  return { loading, dataSupabase, registerLounch, deleteLounch, updateLounch };
};
