import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "https://api.polyak.pp.ua"
// TODO: сделать проверку на существование VITE_APP_API_URL если что вывести заметную ошибку
export const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
