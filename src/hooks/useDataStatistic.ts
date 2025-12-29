import { useDataSupabase } from "./useDataSupabase"

export const useDataStatistic = () => {
    const {dataSupabase} = useDataSupabase()

    const totalReceitas = dataSupabase
    .filter(l => l.tipo === 'receita')
    .reduce((acc, l) => acc + l.valor, 0);  


    const totalDespesas = dataSupabase
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, l) => acc + l.valor, 0); 


    const totalDespesasMes = dataSupabase
    .filter(l => {
        if(l.tipo !== 'despesa') return false;   
        const lancamentoDate = new Date(l.created_at);
        const now = new Date();
        return lancamentoDate.getMonth() === now.getMonth() && lancamentoDate.getFullYear() === now.getFullYear();
    })
    .reduce((acc, l) => acc + l.valor, 0);  


    const totalReceitasMes = dataSupabase
    .filter(l => {
        if(l.tipo !== 'receita') return false;   
        const lancamentoDate = new Date(l.created_at);
        const now = new Date();
        return lancamentoDate.getMonth() === now.getMonth() && lancamentoDate.getFullYear() === now.getFullYear();
    })
    .reduce((acc, l) => acc + l.valor, 0);  

    return {totalReceitas, totalDespesas, totalDespesasMes, totalReceitasMes, };
}
 
