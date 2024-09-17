import axios from "axios";


export const httpClient = axios.create({
    baseURL:  'https://store.api.fboulocq.com.ar/api/v1',
});


