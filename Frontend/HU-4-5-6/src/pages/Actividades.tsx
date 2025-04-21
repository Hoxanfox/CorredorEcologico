import React, { useEffect, useState } from 'react';
import { useActividadAPI } from '../components/admin/actividades/useActividadAPI';

export const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const { getAll, remove } = useActividadAPI();

  useEffect(() => {
    // Cargar las actividades al montar el componente
    getAll().then(res => setActividades(res.data));
  }, []);

  const handleDelete = (id: number) => {
    // Eliminar la actividad y actualizar el estado
    //remove(id).then(() => setActividades(prev => prev.filter(a => a.id !== id)));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Lista de Actividades</h2>
      <ul>
        {actividades.map((a: any) => (
          <li key={a.id} className="mb-2">
            <strong>{a.titulo}</strong> - {new Date(a.fecha).toLocaleDateString()}
            <button onClick={() => handleDelete(a.id)} className="ml-2 text-red-500">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
