import axios from "axios";

const Http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL || 'https://sghpp-production-ityyg6.laravel.cloud/api/v1'
});


export default Http;
