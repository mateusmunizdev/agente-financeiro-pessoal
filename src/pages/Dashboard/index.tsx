import { ChartColumn, icons } from "lucide-react";
import Loading from "../../components/Loading";
import { useDataStatistic } from "../../hooks/useDataStatistic";
import { formatarMoedaBrasileira } from "../../utils/formatCurrency";
import { DataContext } from "../../context/dataContext";
import { useContext } from "react";



const Dashboard = () => {
    const {totalReceitas, totalDespesas, totalDespesasMes, totalReceitasMes} = useDataStatistic();

    const data = useContext(DataContext);

    const loadingDataContext = data?.loading;

    if(loadingDataContext ){
        return <Loading/>
    }

    const cardStatistic = [
        {title: "Total Receitas", value: totalReceitas,icon: icons.ArrowUp, color: "green", type: "receita"},
        {title: "Total Despesas", value: totalDespesas,icon: icons.ArrowDown, color: "red", type: "despesa"},
        {title: "Total Despesas Este Mês", value: totalDespesasMes,icon: icons.ArrowDownRight, color: "red", type: "despesa"},
        {title: "Total Receitas Este Mês", value: totalReceitasMes,icon: icons.ArrowUpRight, color: "green", type: "receita"},
    ];
   

    
    return (<div className="p-4 w-full max-w-300 m-auto page-enter">
    <h1 className="text-sky-700 font-semibold text-sm md:text-xl px-2">Painel de estatísticas</h1>
{totalDespesas || totalReceitas ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {cardStatistic.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                    <div className="p-1 flex flex-col space-y-4">
                        <p className="text-sky-700 capitalize text-sm">{card.title}</p>
                        <p className={`text-sm ${card.type === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}>{formatarMoedaBrasileira(card.value)}</p>
                    </div>
                    <div className={`p-2 rounded-lg shadow-md shadow-sky-400/20 bg-sky-300/10`}>
                        <card.icon color={card.color} className={`h-6 w-6`} />
                    </div>
                    
                </div>
            </div>
        ))}
    </div> : <div className="w-full h-full flex flex-col items-center justify-center mt-15">
          <div className="text-sky-700/50">
            <ChartColumn size={50} strokeWidth={1} />
            
          </div>
          <p className="text-gray-600">Nenhuma transação foi encontrada</p>
        </div>}


   
    </div>);
}
 
export default Dashboard;