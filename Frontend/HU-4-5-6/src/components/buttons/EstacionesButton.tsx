import React, { useState, useRef, useEffect } from "react";
import EstacionesLista from "./estaciones/EstacionesLista";

interface EstacionesButtonProps {
  isAdmin: boolean;
}

export const EstacionesButton: React.FC<EstacionesButtonProps> = ({ isAdmin }) => {
  const [mostrarLista, setMostrarLista] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setMostrarLista(prev => !prev);
  };

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMostrarLista(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={handleClick}
        className="w-full text-left hover:text-blue-600"
      >
        Estaciones
      </button>

      {mostrarLista && (
        <div
          className="absolute top-0 left-full -ml-64 z-[9999] bg-white shadow-2xl border border-gray-300 rounded-lg w-64 text-sm"
        >
          <EstacionesLista />
        </div>
      )}
    </div>
  );
};
