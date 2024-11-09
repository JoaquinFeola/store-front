import { ReactNode } from "react"
import { AdjustmentStockContext } from "../AdjustmentStockContext"
import { useAdjustmenStock } from "@/hooks/store/useAdjustmenStock"

interface Props {
    children: ReactNode
}

export const AdjustmentStockProvider = ({ children }: Props) => {
    const adjustmentStock = useAdjustmenStock();
    return (
        <AdjustmentStockContext.Provider value={{ ...adjustmentStock }}>
            {children}
        </AdjustmentStockContext.Provider>
    )
}
