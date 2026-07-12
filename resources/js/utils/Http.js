import axios from "axios";

const Http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL || 'http://127.0.0.1:9010/api/v1'
});


export default Http;
