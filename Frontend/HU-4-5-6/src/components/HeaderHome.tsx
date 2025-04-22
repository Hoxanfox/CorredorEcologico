import DropdownMenu from "../components/DropdownMenu"; // Asegúrate de que esté bien importado
import logoUnillanos from "../assets/imagenUnillanos.png"; // Ajusta la ruta según sea necesario

const HeaderHome = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 text-white ">
      {/* Logo y eslogan alineados a la izquierda */}
      <div className="flex items-center gap-3">
        <img src={logoUnillanos} alt="Logo Unillanos" className="h-12 w-auto" />
        <div className="text-[rgb(107,75,64)] text-3xl font-semibold font-sans">
          <p>Sendero Ecológico Unillanos</p>
        </div>
      </div>

      {/* Menú de navegación alineado a la derecha */}
      <div className="flex-shrink-0 ml-auto">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default HeaderHome;
