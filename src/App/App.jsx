import { BrowserRouter, Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { MainRoutes } from "../routes";
import './App.css'

export function App() {

  return (
    <BrowserRouter>
      <Header />
      <MainRoutes />
      <Outlet />
    </BrowserRouter>
  )
}
