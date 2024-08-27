import { ReactNode } from "react"
import { SalesContext } from "../SalesContext"
import { useSales } from "../../hooks/useSales"




export const SalesProvider = ({ children }: { children: ReactNode }) => {
    const salesData = useSales();
    return (
        <SalesContext.Provider value={{...salesData}}>
            {children}
        </SalesContext.Provider>
    )
}
