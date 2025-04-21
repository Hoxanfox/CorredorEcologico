import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Estacion } from "./types";

interface Props {
  apiUrl: string;
}

export const AdminEstacionList: React.FC<Props> = ({ apiUrl }) => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiUrl}/estacion/`);
        if (!res.ok) throw new Error("Error cargando estaciones");
        const data: Estacion[] = await res.json();
        setEstaciones(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiUrl]);

  const onDelete = async (id?: number) => {
    if (!id || !window.confirm("¿Eliminar estación?")) return;
    try {
      const res = await fetch(`${apiUrl}/estacion/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando");
      setEstaciones(estaciones.filter(e => e.id !== id));
    } catch (e) {
      alert((e as Error).message);
    }
  };

  if (loading) return <p>Cargando estaciones...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Estaciones</h1>
      <button
        onClick={() => navigate("/admin/estaciones/create")}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >Crear estación</button>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>#</th><th>Número</th><th>Nombre</th><th>Latitud</th><th>Longitud</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estaciones.map(e => (
            <tr key={e.id} className="border-t">
              <td>{e.id}</td><td>{e.numero}</td><td>{e.nombre}</td>
              <td>{e.latitud}</td><td>{e.longitud}</td>
              <td className="space-x-2">
                <button onClick={() => navigate(`/admin/estaciones/${e.id}/edit`)} className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                <button onClick={() => onDelete(e.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
