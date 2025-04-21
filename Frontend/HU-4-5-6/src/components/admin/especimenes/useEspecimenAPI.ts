import axios from 'axios';

const API = 'http://localhost:8080/especimen/';

export const useEspecimenAPI = () => {
  const getAll = () => axios.get(API);
  const getById = (id: number) => axios.get(`${API}${id}`);
  const create = (data: any) => axios.post(API, data);
  const update = (data: any) => axios.put(API, data);
  const remove = (id: number) => axios.delete(`${API}${id}`);

  return { getAll, getById, create, update, remove };
};
