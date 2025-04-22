import React from "react";
import { EstacionesButton } from "./buttons/EstacionesButton";
import { MapaButton } from "./buttons/MapaButton";
import { ActividadesButton } from "./buttons/ActividadesButton";
import { LogoutButton } from "./buttons/LogoutButton";

const DropdownMenu: React.FC = () => {
  const isAdmin = false; // cambia a true para probar

  return (
    <nav className="inline-flex items-center gap-4 px-4 py-2 bg-white text-sm text-[rgb(107,75,64)] font-medium">
      {/* Asegúrate de que no haya estilos que causen puntos indeseados */}
      <div className="hover:text-blue-600 transition-colors">
        <EstacionesButton isAdmin={isAdmin} />
      </div>
      <div className="hover:text-blue-600 transition-colors">
        <MapaButton />
      </div>
      <div className="hover:text-blue-600 transition-colors">
        <ActividadesButton />
      </div>
      <div className="hover:text-blue-600 transition-colors cursor-default">
        deivid
      </div>
      <div className="hover:text-blue-600 transition-colors">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default DropdownMenu;
