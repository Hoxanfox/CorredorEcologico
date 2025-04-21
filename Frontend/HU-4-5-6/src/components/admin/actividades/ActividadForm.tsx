import React, { useState } from 'react';
import { useActividadAPI } from './useActividadAPI';
import { useNavigate } from 'react-router-dom';

export const ActividadForm = () => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [estacionId, setEstacionId] = useState('');
  const [usuarioIds, setUsuarioIds] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { create } = useActividadAPI();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actividad = {
      titulo,
      fecha: new Date(fecha).toISOString(),
      estacion: { id: Number(estacionId) },
      usuarios: usuarioIds.split(',').map(id => ({ id: Number(id.trim()) }))
    };
    create(actividad).then(() => {
      setTitulo('');
      setFecha('');
      setEstacionId('');
      setUsuarioIds('');
      setSuccessMsg('✅ Actividad creada exitosamente');
      setTimeout(() => setSuccessMsg(''), 3000);
    });
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setFecha('');
    setEstacionId('');
    setUsuarioIds('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-gray-200 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-[#20647c] mb-6">Crear Nueva Actividad</h2>

      {successMsg && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center transition-opacity duration-300">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Título</label>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#20647c]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Fecha</label>
          <input
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#20647c]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">ID Estación</label>
          <input
            value={estacionId}
            onChange={e => setEstacionId(e.target.value)}
            placeholder="Ej: 1"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#20647c]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">IDs de Usuarios</label>
          <input
            value={usuarioIds}
            onChange={e => setUsuarioIds(e.target.value)}
            placeholder="Ej: 1, 2"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#20647c]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#20647c] hover:bg-[#20647c]/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Crear Actividad
        </button>

        <button
          type="button"
          onClick={limpiarFormulario}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Limpiar Formulario
        </button>

        <button
          type="button"
          onClick={() => navigate('/actividades')}
          className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};
