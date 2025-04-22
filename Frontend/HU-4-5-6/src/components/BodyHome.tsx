import HeaderHome from "./HeaderHome";
import MapView from "./MapView"; // componente del mapa interactivo

const BodyHome = () => {
  return (
    <div className="flex flex-col  ">
      <MapView />
    </div>
  );
};

export default BodyHome;
