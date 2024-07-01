import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth"
import { AuthContext } from "../AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const authValues = useAuth();


    return (

        <AuthContext.Provider value={{
            ...authValues
        }}>
            {children}
        </AuthContext.Provider>
    )
}
