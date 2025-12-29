import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ClientRouter } from "./ClientRoute";
import ProfileUser from "../pages/ProfileUser";


const Home = lazy(() => import("../pages/Home"));
const Layout = lazy(() => import("../layout/Layout"));
const Dasboard = lazy(() => import("../pages/Dashboard"));
const RegisterLaunch = lazy(() => import("../pages/RegisterLaunch"));

const Router = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientRouter><Layout /></ClientRouter>}>
            <Route index element={<ClientRouter><Home /></ClientRouter>} />
            <Route path="painel" element={<ClientRouter><Dasboard /></ClientRouter>} />
            <Route path="registrar" element={<ClientRouter><RegisterLaunch /></ClientRouter>} />
            <Route path="editar/:id" element={<ClientRouter><RegisterLaunch /></ClientRouter>} />
            <Route path="perfil" element={<ClientRouter><ProfileUser /></ClientRouter>} />
          </Route>
          <Route path="/cadastro" element={<Register />} />
           <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
