import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function ClientRouter({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);


  const loadingSession = auth?.loadingSession;
 const isAuthenticated = auth?.session !== null;
  if (loadingSession) {
    return <Loading />;
  }

 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

