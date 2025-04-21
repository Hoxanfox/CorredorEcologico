import React from "react";
import { Link } from "react-router-dom";

export const LogoutButton: React.FC = () => (
  <li>
    <Link
      to="/logout"
      className="w-full block text-left hover:text-blue-600"
    >
      Cerrar sesión
    </Link>
  </li>
);