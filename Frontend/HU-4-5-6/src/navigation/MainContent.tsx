import React from "react";
import { Routes, Route } from "react-router-dom";
import BodyHome from "../pages/MapaInteractivo";
import EstacionDetail from "../components/EstacionDetail";
import EstacionesLista from "../pages/EstacionesLista";
import {Actividades} from "../pages/Actividades";
//import Logout from "../pages/Logout";
import { getAdminRoutes } from "../components/admin/AdminRoutes";
import NotFound from "../pages/NotFound"; // Ajusta la ruta según tu estructura

const MainContent: React.FC = () => {
  const apiUrl = "http://localhost:8080";

  return (
    <Routes>
  {/* públicas */}
  <Route path="/mapa/:usuario" element={<BodyHome />} />

  {/* Ruta 404 - debe ir al final */}
  <Route path="*" element={<NotFound />} />
</Routes>

  );
};

export default MainContent;
