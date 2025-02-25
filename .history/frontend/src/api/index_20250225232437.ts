import axios from "axios";

// TODO: сделать проверку на существование VITE_APP_API_URL если что вывести заметную ошибку
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL | 'https://penis.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
