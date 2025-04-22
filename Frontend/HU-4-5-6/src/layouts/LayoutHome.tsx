import { ReactNode } from "react";
import DropdownMenu from "../components/DropdownMenu";
import HeaderHome from "../components/HeaderHome";

interface LayoutProps {
  children: ReactNode;
}

const LayoutHome = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
          <HeaderHome />
      {/* Contenido principal */}
      <main className="flex-1 px-6 py-4 text-gray-800">
        {children}
      </main>
    </div>
  );
};

export default LayoutHome;
