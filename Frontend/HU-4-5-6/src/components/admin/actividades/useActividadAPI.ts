const API = 'http://localhost:8080/actividad/';

export const useActividadAPI = () => {
  const getAll = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error('Error al obtener las actividades');
    }
    return response.json();
  };

  const getById = async (id: number) => {
    const response = await fetch(`${API}${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la actividad con ID ${id}`);
    }
    return response.json();
  };

  const create = async (data: any) => {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: data.titulo,
        fecha: data.fecha,
        estacion: { id: data.estacionId }, // Aquí debes pasar el id de la estación
        usuarios: data.usuarios.map((usuarioId: number) => ({ id: usuarioId })), // Array de objetos con id de usuarios
      }),
    });
    if (!response.ok) {
      throw new Error('Error al crear la actividad');
    }
    return response.json();
  };

  const update = async (data: any) => {
    const response = await fetch(API, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        titulo: data.titulo,
        fecha: data.fecha,
        estacion: { id: data.estacionId }, // Aquí también el id de la estación
      }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la actividad');
    }
    return response.json();
  };

  const remove = async (id: number) => {
    const response = await fetch(`${API}${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la actividad con ID ${id}`);
    }
    return response.json();
  };

  return { getAll, getById, create, update, remove };
};
