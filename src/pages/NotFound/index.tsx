import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Container principal */}
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
        
        {/* Ícone de erro */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-sky-100 to-blue-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
              <AlertTriangle 
                size={56} 
                className="text-sky-500"
                strokeWidth={1.5}
              />
            </div>
          </div>
          
          {/* Anel animado */}
          <div className="absolute inset-0 rounded-full border-4 border-sky-200/30 animate-ping" />
        </div>

        {/* Texto do erro */}
        <div className="space-y-4">
          <div className="relative">
            <h1 className="text-7xl font-bold text-sky-600 tracking-tight">
              404
            </h1>
            <div className="absolute -top-2 -right-6">
              <span className="text-2xl text-sky-400 animate-bounce">😔</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-sky-800">
            Página não encontrada
          </h2>
          
          <p className="text-sky-600/80 leading-relaxed">
            Oops! Parece que você se perdeu no caminho.
            <br />
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Botão de voltar para home */}
        <div className="pt-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span>Voltar para Home</span>
            <div className="group-hover:translate-x-1 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Texto de ajuda */}
        <div className="pt-8 border-t border-sky-100">
          <p className="text-sm text-sky-500/60">
            Se você acha que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>

      {/* Decorações */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-sky-300/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
    </div>
  );
};

export default NotFound;