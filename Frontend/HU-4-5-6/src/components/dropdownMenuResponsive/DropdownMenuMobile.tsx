import React, { useState } from "react";
import { EstacionesButton } from "../buttons/EstacionesButton";
import { MapaButton } from "../buttons/MapaButton";
import { ActividadesButton } from "../buttons/ActividadesButton";
import { LogoutButton } from "../buttons/LogoutButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; // Icono de tres rayas y de cerrar

interface DropdownMenuMobileProps {
  username: string;
  isAdmin: boolean;
}

const DropdownMenuMobile: React.FC<DropdownMenuMobileProps> = ({ username, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#00873f] text-white">
        {/* Botón de abrir y cerrar el menú */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir o cerrar menú"
        >
          {menuOpen ? (
            <XMarkIcon className="h-8 w-8 text-white" /> // Icono de cerrar
          ) : (
            <Bars3Icon className="h-8 w-8 text-white" /> // Icono de abrir
          )}
        </button>
      </div>

      {/* 🔹 Menú desplegable */}
      {menuOpen && (
        <div
          className="flex flex-col gap-4 px-4 py-4 border-t border-white/20 bg-[#5e8c6a] shadow-lg fixed top-0 right-0 z-50"
          style={{ top: '80px', right: '0', width: 'auto', maxWidth: '250px' }} // Ajusta la posición hacia la esquina superior derecha
        >
          <EstacionesButton isAdmin={isAdmin} />
          <MapaButton />
          <ActividadesButton />
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default DropdownMenuMobile;
