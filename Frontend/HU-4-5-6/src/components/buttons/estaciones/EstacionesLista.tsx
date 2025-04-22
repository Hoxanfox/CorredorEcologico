// src/pages/EstacionesLista.tsx
import React from "react";

// Ejemplo de datos; en producción probablemente vengas de un fetch o prop
const estaciones = [
  { id: 1, nombre: "Herbario" },
  { id: 2, nombre: "Mirador del Río" },
  { id: 3, nombre: "Zona de Aves" },
  // …añade más estaciones según necesites
];

const EstacionesLista: React.FC = () => {
  return (
    <div className="p-3">
      <h2 className="text-lg font-semibold mb-2">Estaciones</h2>
      <ul className="space-y-1">
        {estaciones.map((est) => (
          <li key={est.id}>
            <a
              href={`http://localhost:4200/estacion/${est.id}`}
              className="block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded w-full text-left text-sm"
            >
              {est.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstacionesLista;
