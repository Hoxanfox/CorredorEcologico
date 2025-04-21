// src/pages/EstacionesLista.tsx
import React, { useEffect, useState } from "react";

interface Estacion {
  id: number;
  numero: number;
  nombre: string;
  latitud: string;
  longitud: string;
  elementoInteractivo: string;
}

const EstacionesLista: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstaciones = async () => {
      console.log("📡 Iniciando solicitud para obtener estaciones...");
      try {
        const res = await fetch("http://localhost:8080/estacion/");
        console.log("🔄 Respuesta recibida:", res);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Error en la respuesta:", errorText);
          throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
        }

        const data: Estacion[] = await res.json();
        console.log("✅ Datos obtenidos correctamente:", data);

        setEstaciones(data);
      } catch (e) {
        const mensaje = (e as Error).message;
        console.error("💥 Error al obtener estaciones:", mensaje);
        setError(mensaje);
      } finally {
        console.log("✅ Finalizó proceso de carga.");
        setLoading(false);
      }
    };

    fetchEstaciones();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">⏳ Cargando estaciones...</p>;
  if (error) return <p className="p-4 text-red-500">🚨 Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📍 Listado de Estaciones</h1>
      {estaciones.length === 0 ? (
        <p className="text-gray-500">🔍 No se encontraron estaciones disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {estaciones.map((e) => (
            <li
              key={e.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <a
                href={`/estacion/${e.id}`}
                className="text-xl text-blue-600 hover:underline font-medium"
              >
                Estación {e.numero}: {e.nombre}
              </a>
              <div className="text-sm text-gray-700 mt-1">
                <p>📍 Latitud: {e.latitud}</p>
                <p>📍 Longitud: {e.longitud}</p>
                {e.elementoInteractivo && (
                  <p>🎮 Interactivo: {e.elementoInteractivo}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EstacionesLista;
