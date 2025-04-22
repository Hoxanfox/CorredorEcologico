import React from "react";
import { EstacionesButton } from "./buttons/EstacionesButton";
import { MapaButton } from "./buttons/MapaButton";
import { ActividadesButton } from "./buttons/ActividadesButton";
import { LogoutButton } from "./buttons/LogoutButton";
import { UserIcon } from "@heroicons/react/24/solid";  // Icono de usuario
import { Bars3Icon } from "@heroicons/react/24/solid";  // Icono de tres rayas

const DropdownMenu: React.FC = () => {
  const isAdmin = false; // cambia a true para probar

  return (
    <aside className="w-60 bg-red-100 border border-red-300 p-4 space-y-2">
      {/* Cabecera con icono de usuario y nombre centrado */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <UserIcon className="h-8 w-8 text-black" />
        <span className="text-black text-lg font-semibold">
          {isAdmin ? "ADMIN" : "USER"}
        </span>
        {/* Icono de las tres rayas (Hamburger menu) */}
        <Bars3Icon className="h-6 w-6 text-black" />
      </div>
      
      <ul className="space-y-2">
        {/* Estaciones visible para todos (usuario y admin) */}
        <li className="border border-black bg-white px-2 py-1 text-sm">
          <EstacionesButton isAdmin={isAdmin} />
        </li>

        {/* Mapa */}
        <li className="border border-black bg-white px-2 py-1 text-sm">
          <MapaButton />
        </li>

        {/* Actividades */}
        <li className="border border-black bg-white px-2 py-1 text-sm">
          <ActividadesButton />
        </li>

        {/* Especies solo visible si es admin */}
        {isAdmin && (
          <li className="border border-black bg-white px-2 py-1 text-sm">
            <button className="w-full">Especies</button>
          </li>
        )}

        {/* Usuarios solo visible si es admin */}
        {isAdmin && (
          <li className="border border-black bg-white px-2 py-1 text-sm">
            <button className="w-full">Usuarios</button>
          </li>
        )}

        {/* Cerrar sesión */}
        <li className="border border-black bg-white px-2 py-1 text-sm">
          <LogoutButton />
        </li>
      </ul>
    
    </aside>
  );
};

export default DropdownMenu;
