import { Route, Routes } from "react-router-dom"

import { Home } from "../pages/Home/Home"

export function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
        </Routes>
    )
}