import React, { useEffect, useState } from 'react';
import { useActividadAPI } from './useActividadAPI';

type Actividad = {
  id: number;
  titulo: string;
  fecha: string;
};

export const ActividadList = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const { getAll, remove } = useActividadAPI();

  useEffect(() => {
    getAll().then(data => setActividades(data));
  }, []);

  const handleDelete = (id: number) => {
    remove(id).then(() => setActividades(prev => prev.filter(a => a.id !== id)));
  };

  return (
    <div className="p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Lista de Actividades</h2>
      <ul className="space-y-3">
        {actividades.map(a => (
          <li key={a.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-100 transition">
            <div>
              <strong>{a.titulo}</strong> - {new Date(a.fecha).toLocaleDateString()}
            </div>
            <button onClick={() => handleDelete(a.id)} className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
