import React from "react";
import { Routes, Route } from "react-router-dom";
import BodyHome from "../pages/MapaInteractivo";
import EstacionDetail from "../components/EstacionDetail";
import EstacionesLista from "../pages/EstacionesLista";
import {Actividades} from "../pages/Actividades";
//import Logout from "../pages/Logout";
import { getAdminRoutes } from "../components/admin/AdminRoutes";

const MainContent: React.FC = () => {
  const apiUrl = "http://localhost:8080";

  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<BodyHome />} />
      <Route path="/estacion/:id" element={<EstacionDetail />} />
      <Route path="/estacionesLista" element={<EstacionesLista />} />
      <Route path="/actividades" element={<Actividades />} />
      <Route path="/logout" element={<EstacionesLista/>} />

      {/* admin */}
      {getAdminRoutes(apiUrl)}
    </Routes>
  );
};

export default MainContent;
