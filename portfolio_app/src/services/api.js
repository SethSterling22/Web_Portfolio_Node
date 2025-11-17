import axios from 'axios';

// Obtener el token de localStorage
const token = localStorage.getItem('authToken');

const api = axios.create({
  // baseURL: 'http://localhost:3001/api/v1/',
  // Chenge the baseURL with your API URL
  baseURL: 'https://tailscale-funnel.stegosaurus-panga.ts.net/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // Change the APIKEY with the variable in your API .env
    'X-Api-Key': 'Un_API_KEY_Muy_Seguro_y_confiable_:D',
    'Authorization': token ? `Bearer ${token}` : ''
  },
});



// Interceptor para añadir el token antes de cada petición
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);




//GET request
export const getItems = (resource) => api.get(resource);

//GET by id request
export const getItemById = (resource, id) => api.get(`${resource}\\${id}`);

//POST request
export const createItem = (resource, data) => api.post(resource, data);

//PUT request
export const editItem = (resource, id, data) => api.put(`${resource}\\${id}`, data);

//DELETE request 
export const deleteItem = (resource, id) => api.delete(`${resource}\\${id}`);

export default api;
