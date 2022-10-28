import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { SignUp } from "../pages/SignUp/SignUp";

export function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
        </Routes>
    )
}