import { AUTH_STATE } from "@/consts";
import { AuthContext } from "@/context";
import { FullLoading } from "@/ui/components";
import { getItemFromLocalStorage } from "@/utils/localstorage.util";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";





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

