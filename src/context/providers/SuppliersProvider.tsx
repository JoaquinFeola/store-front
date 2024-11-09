import { ReactNode } from "react"
import { SuppliersContext } from "../SuppliersContext"
import { useSuppliers } from "../../hooks/store/useSuppliers"



export const SuppliersProvider = ({ children }: {children: ReactNode}) => {

  const suppliersData = useSuppliers()

  return (
    <SuppliersContext.Provider value={{...suppliersData}}>
        {children}
    </SuppliersContext.Provider>
  )
}
