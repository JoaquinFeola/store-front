import { useContext, useEffect, useState } from "react";
import { AUTH_LOGIN_KEY, AUTH_STATE } from "../../consts";
import { User, UserCredentials, ApiResponse } from "../../interfaces";
import { httpClient } from "../../api/axios-config";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localstorage.util";
import { isTokenExpired } from "../../utils/token.util";
import { AlertsContext } from "../../context";

export interface AuthState {
  user: User | null;
  status: string;
};

export interface AuthResponse {
  token: string;
  expiration: Date;
}


export const useAuth = () => {
  const { addAlert } = useContext(AlertsContext);

  const [auth, setAuth] = useState<AuthState>({
    user: null,
    status: AUTH_STATE.CHECKING
  });




  const renewToken = async () => {
    try {
      const { data }: ApiResponse<AuthResponse> = await httpClient.get('/user/current-user');

      setItemToLocalStorage(AUTH_LOGIN_KEY, data.data);


    }
    catch (error) {
      return error;
    }
  }


  const changeAuthStatus = (newStatus: string) => {
    setAuth({
      ...auth,
      status: newStatus,
    })
  }

  const logout = () => {
    removeItemFromLocalStorage(AUTH_LOGIN_KEY);
    setAuth({
      status: AUTH_STATE.NOT_AUTHENTICATED,
      user: null
    });
  };

  const login = async (credentials: UserCredentials) => {
    if (credentials.email.length === 0 || credentials.password.length === 0) return;
    changeAuthStatus(AUTH_STATE.CHECKING)
    try {
      const { data }: ApiResponse<AuthResponse> = await httpClient.post('/user/login', credentials);
      setItemToLocalStorage(AUTH_LOGIN_KEY, data.data);
      const userInfoResponse: ApiResponse<User> = await httpClient.get('/user/current-user')
      const userInfo = userInfoResponse.data.data;

      addAlert({
        duration: 1300,
        message: 'Inicio de sesión exitoso',
        type: 'success',
        id: new Date().getTime().toString()
      });


      setAuth({
        status: AUTH_STATE.AUTHENTICATED,
        user: userInfo
      });
    }
    catch (error) {
      addAlert({
        duration: 5300,
        message: 'Ocurrió un error al iniciar sesión, intentalo nuevamente',
        type: 'error',
        id: new Date().getTime().toString()
      });
      changeAuthStatus(AUTH_STATE.NOT_AUTHENTICATED)
    }
  };

  useEffect(() => {
    const autoLogin = async () => {
      changeAuthStatus(AUTH_STATE.CHECKING)
      try {
        const token = getItemFromLocalStorage<AuthResponse>(AUTH_LOGIN_KEY);
        if (token === null) throw new Error('No token found');
        if (isTokenExpired(token.expiration)) {
          logout();
          addAlert({
            message: 'Tu sesión ha expirado',
            duration: 4000,
            type: 'info'
          });
          return;
        };
        const userInfoResponse: ApiResponse<User> = await httpClient.get('/user/current-user')
        const userInfo = userInfoResponse.data.data;


        setAuth({
          status: AUTH_STATE.AUTHENTICATED,
          user: userInfo
        });
      }
      catch (error) {
        console.error(error)
        changeAuthStatus(AUTH_STATE.NOT_AUTHENTICATED)

      }
    };
    autoLogin();


  }, []);


  return {
    auth,
    login,
    logout,
    renewToken
  }
}
