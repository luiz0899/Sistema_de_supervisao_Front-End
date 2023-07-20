import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import RequireAuth from "../components/RequireAuth"
import Login from "../pages/Login" ;
import Grafico from "../pages/Grafico";
import Supervizao from "../pages/Supervisao";
import Operacao from "../pages/Operacao";

const ROLES = {
    admin: 1,
  };

export default function MainRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/grafico" element={<Grafico/>} />
                <Route path="/supervizao" element={<Supervizao />} />
                <Route path="/operacao" element={<Operacao />} />
                <Route element={<RequireAuth  allowedRoles={[ROLES.admin]}  />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="*" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}