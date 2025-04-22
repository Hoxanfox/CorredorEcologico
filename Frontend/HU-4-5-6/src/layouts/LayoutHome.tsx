import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import HeaderHome from "../components/HeaderHome";

interface LayoutProps {
  children: ReactNode;
}

const LayoutHome = ({ children }: LayoutProps) => {

  const location = useLocation();
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    // Cada vez que cambia la ruta, actualiza la key para forzar re-render
    setKey(location.pathname);
  }, [location.pathname]);
  return (
    <div key={key} className="min-h-screen bg-white flex flex-col">
          <HeaderHome />
      {/* Contenido principal */}
      <main className="flex-1 px-6 py-4 text-gray-800">
        {children}
      </main>
    </div>
  );
};

export default LayoutHome;
