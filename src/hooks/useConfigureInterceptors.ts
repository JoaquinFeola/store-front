import { useContext, useEffect } from "react";
import { AlertsContext, AuthContext } from "../context";
import { getItemFromLocalStorage } from "../utils/localstorage.util";
import { AUTH_LOGIN_KEY } from "../consts";
import { InternalAxiosRequestConfig } from "axios";
import { isTokenExpired, shouldRenewToken } from "../utils/token.util";
import { httpClient } from "../api/axios-config";



export const useConfigureInterceptors = () => {
    const { logout, auth, renewToken } = useContext(AuthContext);    
    const { addAlert } = useContext(AlertsContext);


    const requestInterceptor = (config: InternalAxiosRequestConfig) => {
        if (config.url === '/user/login') return config;
        const tokenInfo = getItemFromLocalStorage<{ expiration: Date, token: string }>(AUTH_LOGIN_KEY);
        
        if (tokenInfo === null) {
            logout();
            
            return config
        };

        if (isTokenExpired(tokenInfo.expiration)) {
            logout();
            addAlert({
                duration: 3000,
                message: 'Tu sesión ha expirado',
                type: 'info',
                id: new Date().getTime().toString() 
            })
            return config;
        };
            
        
        
        config.headers.Authorization = `Bearer ${tokenInfo.token}`;
        
        return config;
    };
    
    
    useEffect(() => {
        httpClient.interceptors.request.use(requestInterceptor)
    }, [ auth.user, auth.status ]);

};