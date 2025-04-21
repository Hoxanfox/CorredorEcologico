import HeaderHome from "./HeaderHome";
import MapaSendero from "./MapView"; // componente del mapa interactivo

const BodyHome = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <HeaderHome  />
      <MapaSendero />
    </div>
  );
};

export default BodyHome;
