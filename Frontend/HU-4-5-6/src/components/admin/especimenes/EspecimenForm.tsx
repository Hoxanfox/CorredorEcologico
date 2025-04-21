import React, { useState } from 'react';
import { useEspecimenAPI } from './useEspecimenAPI';

export const EspecimenForm = () => {
  const [nombre, setNombre] = useState('');
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [etapaId, setEtapaId] = useState('');
  const [reinoId, setReinoId] = useState('');
  const { create } = useEspecimenAPI();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const especimenData = {
      nombre,
      etapas: [{ id: Number(etapaId) }],
      reino: { id: Number(reinoId) },
      imagenes: imagenes.map((direccion) => ({ direccion })),
    };
    create(especimenData).then(() => {
      setNombre('');
      setImagenes([]);
      setEtapaId('');
      setReinoId('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="border p-2 w-full" />
      <input value={etapaId} onChange={e => setEtapaId(e.target.value)} placeholder="ID Etapa" className="border p-2 w-full" />
      <input value={reinoId} onChange={e => setReinoId(e.target.value)} placeholder="ID Reino" className="border p-2 w-full" />
      <textarea value={imagenes.join('\n')} onChange={e => setImagenes(e.target.value.split('\n'))} placeholder="Direcciones de imágenes (una por línea)" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Especimen</button>
    </form>
  );
};
