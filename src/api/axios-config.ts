import axios from "axios";


export const httpClient = axios.create({
    baseURL: import.meta.env.PROD ? 'https://store.api.fboulocq.com.ar/api/v1' : 'https://localhost:7055/api/v1',
});


