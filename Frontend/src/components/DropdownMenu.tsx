import React from "react";
import { EstacionesButton } from "./buttons/EstacionesButton";
import { MapaButton } from "./buttons/MapaButton";
import { ActividadesButton } from "./buttons/ActividadesButton";
import { LogoutButton } from "./buttons/LogoutButton";

const DropdownMenu: React.FC = () => {
  // Simula el rol
  const isAdmin = false; // pon true para probar admin

  return (
    <aside className="w-60 bg-white shadow-lg border p-4 space-y-2">
      <div className="text-sm font-semibold text-gray-600 mb-2">User</div>
      <ul className="space-y-2">
        <EstacionesButton isAdmin={isAdmin} />
        <MapaButton />
        <ActividadesButton />
        <LogoutButton />
      </ul>
    </aside>
  );
};

export default DropdownMenu;