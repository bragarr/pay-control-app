import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { Cadastros } from "../pages/Cadastros/Cadastros"
import { Pagamentos } from "../pages/Pagamentos/Pagamentos"

export function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="cadastros" element={<Cadastros />}></Route>
            <Route path="pagamentos" element={<Pagamentos />}></Route>
        </Routes>
    )
}