import { AUTH_STATE } from "@/consts";
import { AppProvider, AuthContext } from "@/context";
import { setItemToLocalStorage } from "@/utils/localstorage.util";
import { ReactNode, useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";


export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { auth } = useContext(AuthContext);
    const locationReact = useLocation();

    useEffect(() => {
        const automatlySaveURL = () => {
            if (auth.status !== AUTH_STATE.CHECKING) {
                setItemToLocalStorage('lastNavigation', locationReact.pathname);
            }
        };
        automatlySaveURL()
    }, [locationReact]);

    return (auth.status === AUTH_STATE.AUTHENTICATED && auth.user !== null)
        ? (
            <AppProvider>
                {children}
            </AppProvider>
        )
        : <Navigate to="/auth/login" />
}
