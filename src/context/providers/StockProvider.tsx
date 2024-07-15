import { ReactNode } from "react"
import { StockContext } from "../StockContext"
import { useStock } from "../../hooks/useStock"

export const StockProvider = ({ children }: { children: ReactNode }) => {
    
    const stockData = useStock();
    return (
        <StockContext.Provider value={{
            ...stockData
        }}>
            {children}
        </StockContext.Provider>
    )
}
