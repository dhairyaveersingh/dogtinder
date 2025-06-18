// API layer
import axios from 'axios';

export const fetchPets = async (filters) => {
  const res = await axios.get('/api/pets', { params: filters });
  return res.data;
};
  