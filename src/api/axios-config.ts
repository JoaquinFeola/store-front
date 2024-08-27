import axios from "axios";


export const httpClient = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:5289/api/v1' : 'https://store.api.fboulocq.com.ar/api/v1',
});


