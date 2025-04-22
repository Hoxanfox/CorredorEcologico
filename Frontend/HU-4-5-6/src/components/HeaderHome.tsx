import DropdownMenu from "../components/DropdownMenu";
import logoUnillanos from "../assets/imagenUnillanos.png";

const HeaderHome = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#00873f] text-3xl  text-white">
      {/* Logo y eslogan alineados a la izquierda */}
      <div className="flex items-center gap-4">
        <img src={logoUnillanos} alt="Logo Unillanos" className="h-25 w-auto bg-transparent" />
        <div className="text-white  font-semibold font-sans">
          Sendero ecológico
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
