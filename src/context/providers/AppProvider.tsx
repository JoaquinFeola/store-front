import { ReactNode } from "react"
import {
    AdjustmentStockProvider,
    CategoriesProvider,
    ModalsProvider,
    ProductsProvider,
    SalesProvider,
    StockProvider,
    SuppliersProvider
} from "./"

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ModalsProvider>
            <CategoriesProvider>
                <SuppliersProvider>
                    <ProductsProvider>
                        <StockProvider>
                            <AdjustmentStockProvider >
                                <SalesProvider>
                                    {children}
                                </SalesProvider>
                            </AdjustmentStockProvider>
                        </StockProvider>
                    </ProductsProvider>
                </SuppliersProvider>
            </CategoriesProvider>
        </ModalsProvider>
    )
}
