import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export function useDataContext() {
  const data = useContext(DataContext);

  if (!data) {
    throw new Error("useDataContext must be used within DataContextProvider");
  }

  return data;
}