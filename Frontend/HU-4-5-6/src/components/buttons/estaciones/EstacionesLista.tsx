import React from "react";

const estaciones = [
  { id: 14, nombre: "Herbario" },
  { id: 13, nombre: "Lácteos" },
  { id: 15, nombre: "Museo" },
  // Puedes agregar más estaciones
];

const EstacionesLista: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
        Estaciones Sendero Ecológico
      </h2>
      <ul className="space-y-3">
        {estaciones.map((est) => (
          <li key={est.id}>
            <a
              href={`http://localhost:4200/estacion/${est.id}`}
              className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition-colors duration-200 shadow-md"
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
