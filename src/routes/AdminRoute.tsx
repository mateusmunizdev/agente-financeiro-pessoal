/* import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Loading from "../components/Loading";

export function AdminRoute({ children }) {
  const { session, admin, loadingSession, loadingRole } = useAuthContext();

  if (
    loadingSession ||
    loadingRole ||
    session === undefined ||
    admin === undefined
  ) {
    return <Loading />;
  }

  if (!session || admin === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}
 */