import { BrowserRouter, Outlet } from 'react-router-dom';
import { MainRoutes } from "../routes";
import './App.css'

export function App() {

  return (
    <BrowserRouter>
      <MainRoutes />
      <Outlet />
    </BrowserRouter>
  )
}
