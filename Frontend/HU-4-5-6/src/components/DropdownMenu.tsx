import React, { useState, useEffect } from "react";
import { EstacionesButton } from "./buttons/EstacionesButton";
import { MapaButton } from "./buttons/MapaButton";
import { ActividadesButton } from "./buttons/ActividadesButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { UserIcon } from "@heroicons/react/24/solid";  // Icono de usuario
import { Bars3Icon } from "@heroicons/react/24/solid";  // Icono de tres rayas

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

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <nav className="inline-flex items-center gap-4 px-4 py-2 bg-[#00873f] text-white text-3xl font-sans">
      <div className="hover:text-green-200 transition-colors">
        <EstacionesButton isAdmin={isAdmin} />
      </div>
      <div className="hover:text-green-200 transition-colors">
        <MapaButton />
      </div>
      <div className="hover:text-green-200 transition-colors">
        <ActividadesButton />
      </div>
      <div className="cursor-default text-white/80">
        {username}
      </div>
      <div className="hover:text-green-200 transition-colors">
        <LogoutButton />
      </div>
    </nav>
  );
};

export default DropdownMenu;
