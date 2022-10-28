import { BrowserRouter, Outlet } from 'react-router-dom';
import { FastLogin } from '../components/FastLogin/FastLogin';
import { Header } from '../components/Header/Header';
import { MainRoutes } from "../routes";
import './App.css'

export function App() {

  return (
    <BrowserRouter>
      <Header />
      <FastLogin />
      <MainRoutes />
      <Outlet />
    </BrowserRouter>
  )
}
