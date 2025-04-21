import React from "react";
import { Link } from "react-router-dom";

export const ActividadesButton: React.FC = () => (
  <li>
    <Link
      to="/actividades"
      className="w-full block text-left hover:text-blue-600"
    >
      Actividades
    </Link>
  </li>
);