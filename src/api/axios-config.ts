import axios from "axios";


export const httpClient = axios.create({
    baseURL: 'http://localhost:5289/api/v1',
});

