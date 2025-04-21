import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

interface EstacionesButtonProps {
  isAdmin: boolean;
}

// Hacemos el componente forwardRef para que acepte una ref externa
export const EstacionesButton = forwardRef<HTMLAnchorElement, EstacionesButtonProps>(
  ({ isAdmin }, ref) => {
    const to = isAdmin ? "/admin/estaciones" : "/estacionesLista";

    return (
      <li>
        <Link
          ref={ref} // <- Aquí aplicamos la ref al elemento del DOM
          to={to}
          className="w-full block text-left hover:text-blue-600"
        >
          Estaciones
        </Link>
      </li>
    );
  }
);

EstacionesButton.displayName = "EstacionesButton";
