import React from "react";
import { Link } from "react-router-dom";

export const MapaButton: React.FC = () => (
  <li>
    <Link
      to="/"
      className="w-full block text-left hover:text-blue-600"
    >
      Mapa
    </Link>
  </li>
);