import axios from "axios";

const Http = axios.create({
    baseURL: 'https://iccm.onrender.com/api/v1'
});


export default Http;
