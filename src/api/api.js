import axios from 'axios';
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
    baseURL: import.meta.env.PRODUCTION_URL, // uses .env or .env.development
    withCredentials: true // only if you need cookies (auth, sessions)
});
export default api;
