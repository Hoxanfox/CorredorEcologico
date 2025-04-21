import { ReactNode, useEffect, useRef, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";

interface LayoutProps {
  children: ReactNode;
}

const LayoutHome = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Contenido principal */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Botón del menú (encima del contenido) */}
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        className="fixed top-4 right-4 z-50 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
      >
        ☰
      </button>

      {/* Menú dropdown (encima del contenido) */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className="fixed top-14 right-4 z-40"
        >
          <DropdownMenu />
        </div>
      )}
    </div>
  );
};

export default LayoutHome;
