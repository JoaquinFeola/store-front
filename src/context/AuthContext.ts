import { createContext } from "react";
import { AuthState } from "../hooks/useAuth";
import { UserCredentials } from "../interfaces";



interface AuthContextProps {
    auth: AuthState;
    login: (credentials: UserCredentials) => Promise<void>;
    logout: () => void;
    renewToken: () => void;

}

export const AuthContext = createContext({} as AuthContextProps);