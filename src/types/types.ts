
export type TipoTransacao = "" | "receita" | "despesa";

export interface Lancamentos {
  id:string;
  tipo: TipoTransacao;
  valor: number;
  descricao: string;
  created_at: string;
  data?: string;
  categoria?: string;
  user_id: string;
}


