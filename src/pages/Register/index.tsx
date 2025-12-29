import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
const { signUp } = useAuth();
const [nome, setName] = useState<string>("")
const [email, setEmail] = useState<string>("")
const [password, setPassword] = useState<string>("")
const [confirmPassword, setConfirmPassword] = useState<string>("")

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== confirmPassword){
        toast.warn("As senhas não coincidem!");
        return;
    }   
     
    if(!nome.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
        toast.warn("Por favor, preencha todos os campos!");
        return;
    }   

  try {
    await signUp(email, password, nome);
  } catch (error) {
    toast.error("Falha ao criar conta. Verifique suas credenciais e tente novamente.");
    console.error("Erro ao criar conta:", error);
    return;
  }

     navigate("/login");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-sky-500/10 p-6 space-y-6">
        
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-sky-700">Criar conta</h1>
          <p className="text-sm text-sky-600/70">
            Preencha os dados para se registrar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-sky-700">Nome</span>
            <input
            value={nome}
            onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Digite seu nome..."
              className="border-b-2 border-sky-300 focus:border-sky-500 outline-none p-2 transition-all"
            />
          </label>

          <label className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-sky-700">Email</span>
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Digite seu email..."
              className="border-b-2 border-sky-300 focus:border-sky-500 outline-none p-2 transition-all"
            />
          </label>

          <label className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-sky-700">Senha</span>
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Digite sua senha..."
              className="border-b-2 border-sky-300 focus:border-sky-500 outline-none p-2 transition-all"
            />
          </label>

          <label className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-sky-700">
              Confirmar senha
            </span>
            <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha..."
              className="border-b-2 border-sky-300 focus:border-sky-500 outline-none p-2 transition-all"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-xl transition-all duration-300"
          >
            Registrar
          </button>
        </form>

        <div className="text-center space-y-2 text-sm">
          <p className="text-sky-700">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-sky-600 hover:underline">
              Login
            </Link>
          </p>

          <p className="text-sky-600 hover:underline cursor-pointer">
            Esqueci minha senha
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
