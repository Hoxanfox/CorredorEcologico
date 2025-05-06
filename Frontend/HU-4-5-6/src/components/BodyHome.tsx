import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapView from "./MapView";
import StationCardList from "../components/StationCardList";

const BodyHome: React.FC = () => {
  const { usuario } = useParams<{ usuario: string }>();
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", usuario);
    }
  }, [usuario]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[60%_40%] h-screen">
      {/* Mapa: Ocupa todo el espacio en dispositivos pequeños y el 60% en dispositivos medianos y grandes */}
      <div className="w-full h-full">
        <MapView selectedStationId={selectedStationId} />
      </div>
      {/* Estación Card List: Solo visible en pantallas medianas o mayores */}
      <div className="hidden md:block w-full h-full overflow-y-auto">
        <StationCardList onSelectStation={setSelectedStationId} />
      </div>
    </div>
  );
};

export default BodyHome;
