import React from "react";
import { Link } from "react-router-dom";

export const ActividadesButton: React.FC = () => (
  <div>
    <Link
      to="/actividades"
      className="w-full block text-left hover:text-blue-600"
    >
      Actividades
    </Link>
  </div>
);
