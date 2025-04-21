import React, { useEffect, useState } from 'react';
import { useEspecimenAPI } from './useEspecimenAPI';

export const EspecimenList = () => {
  const [especimenes, setEspecimenes] = useState([]);
  const { getAll, remove } = useEspecimenAPI();

  useEffect(() => {
    getAll().then(res => setEspecimenes(res.data));
  }, []);

  const handleDelete = (id: number) => {
    remove(id).then(() => setEspecimenes(prev => prev.filter(e => e.id !== id)));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Lista de Especimenes</h2>
      <ul>
        {especimenes.map((e: any) => (
          <li key={e.id} className="mb-2">
            <strong>{e.nombre}</strong>
            <button onClick={() => handleDelete(e.id)} className="ml-2 text-red-500">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
