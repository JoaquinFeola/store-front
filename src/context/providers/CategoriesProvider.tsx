import { ReactNode } from "react"
import { CategoriesContext } from "../CategoriesContext"
import { useCategories } from "../../hooks/store/useCategories"

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {

  const categoriesData = useCategories();

  return (
    <CategoriesContext.Provider value={{...categoriesData }}>
        { children }
    </CategoriesContext.Provider>
  )
}
