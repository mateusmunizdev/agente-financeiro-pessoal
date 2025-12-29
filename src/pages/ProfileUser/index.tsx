import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const ProfileUser = () => {
const auth = useContext(AuthContext);

const nomePerfil = auth?.session?.user.user_metadata?.nome || "";
const emailPerfil = auth?.session?.user.email || "";
const idPerfil = auth?.session?.user.id || "";
const createdAt = auth?.session?.user.created_at || "";
const siglaPerfil = nomePerfil
  .split(" ")
  .map((n: string) => n[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);


    return ( <div className="p-4 w-full max-w-200 m-auto page-enter">
        <h1 className="text-sky-700 font-semibold text-sm md:text-xl px-2">Perfil do Usuário</h1>
        <div className="flex flex-col justify-center items-center gap-5 w-full">
            <div className="w-20 h-20 rounded-full bg-sky-600 text-white flex justify-center items-center text-xl font-bold my-2">
          <span>{siglaPerfil}</span>    
        </div>
        <p className="text-left w-full flex flex-col"><strong className="text-sky-800">Nome:</strong> <span className="text-sky-400 border-b border-gray-400 p-2 text-sm">{nomePerfil}</span></p>
        <p className="text-left w-full flex flex-col"><strong className="text-sky-800">Email:</strong> <span className="text-sky-400 border-b border-gray-400 p-2 text-sm">{emailPerfil}</span></p>
        <p className="text-left w-full flex flex-col"><strong className="text-sky-800">ID do Usuário:</strong> <span className="text-sky-400 border-b border-gray-400 p-2 text-sm">{idPerfil}</span></p>
        <p className="text-left w-full flex flex-col"><strong className="text-sky-800">Criado em:</strong> <span className="text-sky-400 border-b border-gray-400 p-2 text-sm">{new Date(createdAt).toLocaleDateString("pt-BR")}</span></p>   
        </div>
         
            </div> );
}

export default ProfileUser;