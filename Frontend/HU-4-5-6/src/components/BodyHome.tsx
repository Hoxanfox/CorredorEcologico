// src/pages/BodyHome.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import MapView from "./MapView"; // Componente del mapa interactivo

const BodyHome: React.FC = () => {
  const { usuario } = useParams<{ usuario: string }>();

  // Guardar el usuario en localStorage cuando cambie
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", usuario);
    }
  }, [usuario]);

  return (
    <div className="flex flex-col">
      <MapView />
    </div>
  );
};

export default BodyHome;
