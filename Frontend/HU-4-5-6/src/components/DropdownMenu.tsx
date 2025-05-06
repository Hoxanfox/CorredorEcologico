import React, { useState, useEffect } from "react";
import { EstacionesButton } from "./buttons/EstacionesButton";
import { MapaButton } from "./buttons/MapaButton";
import { ActividadesButton } from "./buttons/ActividadesButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { Bars3Icon } from "@heroicons/react/24/solid"; // Icono de tres rayas
import DropdownMenuMobile from "./dropdownMenuResponsive/DropdownMenuMobile";  // Asegúrate de importar el componente móvil

const DropdownMenu: React.FC = () => {
  const isAdmin = false;
  const [username, setUsername] = useState("Invitado");

  useEffect(() => {
    const updateUsername = () => {
      const raw = localStorage.getItem("usuario");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setUsername(parsed.username ?? raw);
        } catch {
          setUsername(raw);
        }
      }
    };

    updateUsername();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "usuario") {
        updateUsername();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <nav className="w-full bg-[#00873f] text-white font-sans">
      {/* Mostrar DropdownMenuMobile hasta pantallas de 768px */}
      <div className="md:hidden z-[50]">
        <DropdownMenuMobile username={username} isAdmin={isAdmin} />
      </div>

      {/* 🔹 Menú de escritorio */}
      <div className="hidden md:flex items-center gap-6 px-6 py-4 text-lg text-[30px]">
        <EstacionesButton isAdmin={isAdmin} />
        <MapaButton />
        <ActividadesButton />
        <span className="text-white/80">{username}</span>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default DropdownMenu;
