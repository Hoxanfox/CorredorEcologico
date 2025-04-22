import { ReactNode } from "react";
import DropdownMenu from "../components/DropdownMenu";

interface LayoutProps {
  children: ReactNode;
}

const LayoutHome = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Contenido principal */}
      <main className=" z-10">
        {children}
      </main>
      {/* Menú flotante en la esquina superior derecha */}
      <div className="absolute top-4 right-4 w-60 z-[1000]">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default LayoutHome;
