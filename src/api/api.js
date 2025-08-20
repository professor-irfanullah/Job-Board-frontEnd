import axios from 'axios';
import env from 'dotenv/config'
const api = axios.create({
    baseURL: process.env.PRODUCTION_URL, // uses .env or .env.development
    withCredentials: true // only if you need cookies (auth, sessions)
});
export default api;
