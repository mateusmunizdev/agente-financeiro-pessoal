import { NavLink} from "react-router-dom";
import {
  House,
  LayoutDashboard,
  Eye,
  EyeClosed,
  UserRound,
  TextAlignEnd,
} from "lucide-react";
import { useContext, useMemo, useState, } from "react";
import { formatarMoedaBrasileira } from "../utils/formatCurrency";
import { DataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";

import MenuMobile from "./MenuMobile";

const Header = () => {

  const [showBalance, setShowBalance] = useState(false);
  const data = useContext(DataContext);
  const [isOpen, setOpen] = useState<boolean>(false);

  if (!data) {
    throw new Error("Header deve estar dentro do DataProvider");
  }

  const { dataSupabase } = data;


  const saldo = useMemo(() => {
    const totalReceitas = dataSupabase
      .filter(l => l.tipo === "receita")
      .reduce((acc, l) => acc + l.valor, 0);

    const totalDespesas = dataSupabase
      .filter(l => l.tipo === "despesa")
      .reduce((acc, l) => acc + l.valor, 0);

    return totalReceitas - totalDespesas;
  }, [dataSupabase]);


  const auth = useContext(AuthContext);

    if (!auth) {    
    throw new Error("Header deve estar dentro do AuthProvider");
    }






const nomePerfil = auth.session?.user.user_metadata?.nome || "Usuário";
const siglaPerfil = nomePerfil
  .split(" ")
  .map((n: string) => n[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);

  return (
    <header className="mt-35">
      <div className="fixed w-full top-0 right-0 z-30 bg-linear-to-b from-sky-500 via-sky-700 to-sky-800 h-30 rounded-b-[20%] flex flex-col justify-center px-5 pb-2 shadow-black/30 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white">Olá, {nomePerfil}</p>
          <div className="w-10 h-10 rounded-full bg-white text-sky-600 flex justify-center items-center">
            <span>{siglaPerfil}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-white text-sm">Saldo:</p>
            <div className="flex space-x-3 items-center">
              <span className="text-white font-bold text-lg">
                {showBalance
                  ? formatarMoedaBrasileira(saldo)
                  : <span className="block h-6 w-24 rounded bg-white/60 backdrop-blur" />}
              </span>

              {showBalance ? (
                <Eye
                  size={20}
                  color="#fff"
                  onClick={() => setShowBalance(false)}
                />
              ) : (
                <EyeClosed
                  size={20}
                  color="#fff"
                  onClick={() => setShowBalance(true)}
                />
              )}
            </div>
          </div>

          <TextAlignEnd onClick={() => setOpen(true)} size={28} strokeWidth={3} className="text-white" />
        </div>
      </div>

      <div className="w-full p-4 mt-2 flex justify-around">
        <NavLink className="border border-sky-300 hover:bg-sky-400 rounded-xl py-2.5 px-3 text-sky-500 shadow-md" to="/">
          <House />
        </NavLink>

        <NavLink className="border border-sky-300 hover:bg-sky-400 rounded-xl py-2.5 px-3 text-sky-500 shadow-md" to="/painel">
          <LayoutDashboard />
        </NavLink>

        <NavLink className="border border-sky-300 hover:bg-sky-400 rounded-xl py-2.5 px-3 text-sky-500 shadow-md" to="/perfil">
          <UserRound />
        </NavLink>
      </div>
      <MenuMobile isOpen={isOpen} setOpen={setOpen} />
    </header>
  );
};

export default Header;
