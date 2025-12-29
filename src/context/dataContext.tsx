import { createContext } from "react";
import type { Lancamentos } from "../types/types";
export interface DataContextType {
  loading: boolean;
  dataSupabase: Lancamentos[];
  registerLounch: (lancamento: Lancamentos) => Promise<Lancamentos[] | null>;
  deleteLounch: (id: string) => Promise<Lancamentos[] | null>;
  updateLounch: (id: string, data: Lancamentos) => Promise<Lancamentos[] | null>;
}

export const DataContext = createContext<DataContextType | null>(null);export interface DataContextType {
  loading: boolean;
  dataSupabase: Lancamentos[];
  registerLounch: (lancamento: Lancamentos) => Promise<Lancamentos[] | null>;
  deleteLounch: (id: string) => Promise<Lancamentos[] | null>;
  updateLounch: (id: string, data: Lancamentos) => Promise<Lancamentos[] | null>;
}