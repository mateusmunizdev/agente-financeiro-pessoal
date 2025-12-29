import {
  Car,
  ArrowUp,
  ArrowDown,
  Plus,
  UtensilsCrossed,
  Star,
  MonitorSmartphone,
  LayersPlus,
  BanknoteArrowUp,
  Ellipsis,
  Inbox,
} from "lucide-react";

import Loading from "../../components/Loading";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { formatarMoedaBrasileira } from "../../utils/formatCurrency";
import ActionMenu from "../../components/ModalActions";
import { useState , useContext } from "react";
import { toast } from "react-toastify";
import { DataContext } from "../../context/dataContext";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate();

  const [openId, setOpenId] = useState<string | null>(null);

   const data = useContext(DataContext);





 if (!data) {
    throw new Error("DataContext deve ser usado dentro do DataProvider");
  }

  const dados = data?.dataSupabase ;

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);

    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(data);
  };

  if (data.loading) {
    return <Loading />;
  }

  const deleteLounchModel = async (id: string, descricao: string) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o lançamento de "${descricao}"? `
    );
    if (!confirmDelete) {
      return;
    }

    await data.deleteLounch(id);
    setOpenId(null);
    toast.success(`Lançamento "${descricao}" excluído com sucesso!`);
  };

const onEdit = (id: string) => {
   navigate(`/editar/${id}`);
  };


  return (
    <div>
      
        <div  className="p-4 w-full max-w-300 m-auto page-enter">
          <h1 className="text-sky-700 font-semibold text-sm md:text-xl px-2">
              Minhas transações
            </h1>
   {dados.length > 0 ? (       <ul className="w-full max-w-2xl m-auto mt-4 flex flex-col items-center space-y-5 justify-center px-4 overflow-y-auto pb-20">
            
            {dados.map((lancamento) => (
              <li
                key={lancamento.id}
                className=" relative bg-white/60 w-full rounded-xl p-3 pt-5 space-y-2 shadow-md shadow-black/10 stagger-item"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenId(openId === lancamento.id ? null : lancamento.id);
                  }}
                  className="absolute top-0 left-3  cursor-pointer text-sky-800"
                >
                  <Ellipsis size={20} strokeWidth={2} />
                </div>
                <div className="flex justify-between">
                  <ActionMenu
                    setOpen={() => setOpenId(null)}
                    open={openId === lancamento.id}
                    onEdit={() => onEdit(lancamento.id)}
                    onDelete={() =>
                      deleteLounchModel(lancamento.id, lancamento.descricao)
                    }
                  />
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center p-2 bg-[#f7f8fe] rounded-lg text-sky-800">
                      {lancamento.categoria === "transporte" && (
                        <Car size={20} strokeWidth={0.8} />
                      )}
                      {lancamento.categoria === "alimentacao" && (
                        <UtensilsCrossed size={20} strokeWidth={0.8} />
                      )}
                      {lancamento.categoria === "lazer" && (
                        <MonitorSmartphone size={20} strokeWidth={0.8} />
                      )}
                      {lancamento.categoria === "essencial" && (
                        <Star size={20} strokeWidth={0.8} />
                      )}
                      {lancamento.categoria === "outros" && (
                        <LayersPlus size={20} strokeWidth={0.8} />
                      )}
                      {lancamento.categoria === "recebimento" && (
                        <BanknoteArrowUp size={20} strokeWidth={0.8} />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className=" text-sky-700 capitalize text-sm">
                        {lancamento.descricao}
                      </h3>
                      <p className="text-xs text-sky-700/50">
                        {lancamento.categoria}
                      </p>
                    </div>
                  </div>
                  {lancamento.tipo === "receita" ? (
                    <ArrowUp strokeWidth={1} className="text-emerald-400" />
                  ) : (
                    <ArrowDown strokeWidth={1} className="text-red-400" />
                  )}
                </div>
                <div className="flex items-center justify-between px-1">
                  <div className="flex flex-col ml-2">
                    {lancamento.tipo === "receita" ? (
                      <p className=" text-sm text-emerald-400">
                        +{formatarMoedaBrasileira(lancamento.valor)}
                      </p>
                    ) : (
                      <p className=" text-sm text-red-400">
                        -{formatarMoedaBrasileira(lancamento.valor)}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-sky-700/50  text-right">
                    {formatarData(lancamento.created_at)}h
                  </p>
                </div>
              </li>
            ))}
          </ul>  ) : (
        <div className="w-full h-full flex flex-col items-center justify-center mt-15">
          <div className="text-sky-700/50">
            <Inbox size={50} strokeWidth={1} />
          </div>
          <p className="text-gray-600">Nenhuma transação foi encontrada</p>
        </div>
      )}
        </div>
    
      <Link to="/registrar" className="fixed bottom-5 right-5 z-20">
        <Button
          type="button"
          className=" px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-700 transition-all duration-300 text-white shadow-lg shadow-sky-500/20"
        >
          <Plus />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
