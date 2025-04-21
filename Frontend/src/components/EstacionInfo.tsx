
import { Estacion, Especimen } from "./EstacionDetail";

interface EstacionInfoProps {
  estacion: Estacion;
}

export const EstacionInfo: React.FC<EstacionInfoProps> = ({ estacion }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Información General</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="mb-2">
          <span className="font-medium">Número de estación:</span> {estacion.numero}
        </p>
        <p className="mb-2">
          <span className="font-medium">Nombre:</span> {estacion.nombre}
        </p>
        <p className="mb-2">
          <span className="font-medium">Ubicación:</span> {estacion.latitud}, {estacion.longitud}
        </p>
      </div>
    </div>
  );
};