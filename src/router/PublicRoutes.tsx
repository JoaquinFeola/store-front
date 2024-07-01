import { ReactNode, useContext } from "react";
import { AuthContext } from "../context";
import { AUTH_STATE } from "../consts";
import { FullLoading } from "../ui/components/loadings";
import { Navigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../utils/localstorage.util";





export const PublicRoutes = ({ children }: { children: ReactNode }) => {

    const lastNavigation = getItemFromLocalStorage<string>('lastNavigation')
    const { auth } = useContext(AuthContext);


    return (auth.status === AUTH_STATE.CHECKING)
        ? <FullLoading />
        : (auth.status === AUTH_STATE.NOT_AUTHENTICATED && auth.user === null || auth.status === AUTH_STATE.CHECKING)
            ? children
            : (auth.status === AUTH_STATE.AUTHENTICATED && auth.user !== null)
            && <Navigate to={lastNavigation ?? '/'} />
}

