import { ReactNode } from "react"
import { ProductsContext } from "../ProductsContext"
import { useProducts } from "../../hooks/store/useProducts"

export const ProductsProvider = ({ children }: {children: ReactNode}) => {

    const productsData = useProducts();

  return (
    <ProductsContext.Provider value={{...productsData}}>
        {children}
    </ProductsContext.Provider>
  )
}
