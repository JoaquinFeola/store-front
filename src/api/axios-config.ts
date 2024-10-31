import axios from "axios";


export const httpClient = axios.create({
    baseURL: !import.meta.env.PROD ? 'https://store.api.fboulocq.com.ar/api/v1' : 'http://localhost:5289/api/v1',
});


