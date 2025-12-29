import { useContext, useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import type { Lancamentos } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { DataContext } from "../../context/dataContext";

type TipoTransacao = "" | "receita" | "despesa";

const RegisterLaunch = () => {
  const {id} = useParams<{id: string}>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dataSupabase = useContext(DataContext);
  const registerLounch = dataSupabase?.registerLounch;
  const auth = useContext(AuthContext);
  const session = auth?.session;
  const [typeTransition, setTypeTransition] = useState<TipoTransacao>("");
  const [priceTransition, setPriceTransition] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [categoryTransition, setCategoryTransition] = useState<string>("");


  if (!dataSupabase || !registerLounch) {
    throw new Error("Erro nos hooks de contexto");
  }


  useEffect(() => {
  if (!isEditMode) return;

  async function loadLancamento() {
    const lancamento = dataSupabase?.dataSupabase.find(
      (item) => item.id === id
    );

    if (!lancamento) {
      toast.error("Lançamento não encontrado");
      navigate("/");
      return;
    }

    setTypeTransition(lancamento.tipo);
    setPriceTransition(lancamento.valor);
    setDescription(lancamento.descricao);
    setCategoryTransition(lancamento.categoria ?? "");
  }

  loadLancamento();
}, [id]);

 
  function validacao(): boolean {
    if (!typeTransition) {
      toast.warn("Selecione um tipo de transação!");
      return false;
    }

    if (priceTransition === 0) {
      toast.warn("Digite o valor da transação!");
      return false;
    }

    if (!description.trim()) {
      toast.warn("Digite a descrição da transação!");
      return false;
    }

    if (!categoryTransition) {
      toast.warn("Selecione a categoria da transação!");
      return false;
    }

    return true;
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validacao()) {
      return;
    }
    const lancamento = {
      tipo: typeTransition,
      valor: priceTransition,
      descricao: description,
      categoria: categoryTransition,
      user_id: session?.user.id,
    };



  if (isEditMode && id) {
    await dataSupabase.updateLounch(id, lancamento as Lancamentos);
    toast.success("Lançamento atualizado com sucesso!");
  } else {
    await registerLounch(lancamento as Lancamentos);
    toast.success("Lançamento registrado com sucesso!");
  }

    navigate("/");
    setTypeTransition("");
    setPriceTransition(0);
    setDescription("");
    setCategoryTransition("");
  };



  return (
    <form onSubmit={handleSubmit} className="w-full p-4 page-enter">
      <h1 className="text-sky-700 font-semibold text-sm md:text-xl px-2 mb-3">{isEditMode ? "Editar Lançamento" : "Registrar Lançamento"} </h1>
      <div className="bg-white w-full max-w-150 m-auto flex flex-col gap-5 p-8 rounded-xl stagger-item">
        
        <label className="flex flex-col space-y-1">
          <span className="text-sky-700 font-semibold">Tipo de transação:</span>
          <select
            value={typeTransition}
            onChange={(e) => setTypeTransition(e.target.value as TipoTransacao)}
            className="border-b-2 border-sky-300/40 hover:border-sky-300 focus:border-sky-300 outline-none p-2 transition-all duration-300"
          >
            <option value="">--selecione--</option>
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </label>
        <label className="flex flex-col space-y-1">
          <span className="text-sky-700 font-semibold">Valor:</span>
          <input
            value={priceTransition === 0 ? "" : priceTransition}
            onChange={(e) =>
              setPriceTransition(parseFloat(e.target.value) || 0)
            }
            className="border-b-2 border-sky-300/40 hover:border-sky-300 focus:border-sky-300 outline-none p-2 transition-all duration-300"
            type="number"
            placeholder="Digite o valor da transação..."
          />
        </label>
        <label className="flex flex-col space-y-1">
          <span className="text-sky-700 font-semibold">Descrição:</span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-b-2 border-sky-300/40 hover:border-sky-300 focus:border-sky-300 outline-none p-2 transition-all duration-300"
            type="text"
            placeholder="Digite a descrição da transação..."
          />
        </label>

        <label className="flex flex-col space-y-1">
          <span className="text-sky-700 font-semibold">
            Categoria da transação:
          </span>
          <select
            value={categoryTransition}
            onChange={(e) => setCategoryTransition(e.target.value)}
            className="border-b-2 border-sky-300/40 hover:border-sky-400 focus:border-sky-300 outline-none p-2 transition-all duration-300"
          >
            <option value="">--selecione--</option>
            <option value="transporte">Transporte</option>
            <option value="alimentacao">Alimentação</option>
            <option value="essenciais">Essenciais</option>
            <option value="lazer">Lazer</option>
            <option value="recebimento">Recebimento</option>
            <option value="outros">Outros</option>
          </select>
        </label>
        <Button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 rounded-full py-2 px-4 transition-all duration-300 text-white"
        >
          {isEditMode ? "Atualizar" : "Registrar"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterLaunch;
