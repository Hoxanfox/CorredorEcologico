import React from "react";
import { MapPin } from "lucide-react";
import StationCard from "./ StationCard";

const stations = [
  {
    id: 15,
    name: "Estación 15: Museo historia natural",
    description: "Conservacion de especimenes anaimales",
    image: "/images/entrada.jpg",
  },
  {
    id: 14,
    name: "Estación 14: Herbario",
    description: "Zona de conservacion de especies vegetales",
    image: "/images/biblioteca.jpg",
  },
  {
    id: 13,
    name: "Estación 13: Lacteos",
    description: "laboratorio de lacteos",
    image: "/images/veterinaria.jpg",
  },
];

interface Props {
  onSelectStation: (id: number) => void;
}

const StationCardList: React.FC<Props> = ({ onSelectStation }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-white px-6 py-4 space-y-5 shadow-inner border-l border-gray-200 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-emerald-600" />
        <h2 className="text-2xl font-bold text-emerald-800">Estaciones</h2>
      </div>

      {stations.map((station) => (
        <StationCard
          key={station.id}
          id={station.id}
          name={station.name}
          description={station.description}
          image={station.image}
          onClick={() => onSelectStation(station.id)}
        />
      ))}
    </div>
  );
};

export default StationCardList;
