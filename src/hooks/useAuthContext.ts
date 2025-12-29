import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function useAuthContext() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return auth;
}
