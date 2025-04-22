import React from "react";
import { Link } from "react-router-dom";

export const LogoutButton: React.FC = () => (
  <div>
    <Link
      to="/logout"
      className="w-full block text-left hover:text-blue-600"
    >
      Cerrar sesión
    </Link>
  </div>
);