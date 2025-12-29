import { useDataSupabase } from "../../hooks/useDataSupabase";
import { DataContext } from "../../context/dataContext";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataSupabase();

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
