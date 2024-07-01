import { ReactNode, useContext, useEffect } from "react"
import { AuthContext, CategoriesProvider, ModalsProvider, ProductsProvider } from "../context"
import { AUTH_STATE } from "../consts";
import { Navigate, useLocation } from "react-router-dom";
import { setItemToLocalStorage } from "../utils/localstorage.util";
import { SuppliersProvider } from "../context/providers/SuppliersProvider";



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
            <ModalsProvider>
                <CategoriesProvider>
                    <SuppliersProvider>
                        <ProductsProvider>
                            {children}
                        </ProductsProvider>
                    </SuppliersProvider>
                </CategoriesProvider>
            </ModalsProvider>
        )
        : <Navigate to="/auth/login" />
}
