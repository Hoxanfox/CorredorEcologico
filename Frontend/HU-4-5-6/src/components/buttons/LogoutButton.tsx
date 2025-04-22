import React, { forwardRef } from "react";

export const LogoutButton = forwardRef<HTMLAnchorElement>((props, ref) => {
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del <a>
    localStorage.clear(); // Limpia todo el localStorage
    window.location.href = "http://localhost:4200/"; // Redirige a otro frontend
  };

  return (
    <a
      href="http://localhost:4200/"
      onClick={handleLogout}
      ref={ref}
      className="w-full block text-left hover:text-blue-600"
      {...props}
    >
      Cerrar sesión
    </a>
  );
});

LogoutButton.displayName = "LogoutButton";
