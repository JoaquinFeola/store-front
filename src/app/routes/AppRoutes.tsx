import { Route, Routes } from "react-router-dom"
import { Drawer } from "../../ui/components/drawer/Drawer"
import { CategoriesPage } from "../pages/CategoriesPage"
import { SuppliersPage } from "../pages/SuppliersPage"
import { CreateSuppliersView } from "../views/CreateSuppliersView"
import { ListSuppliersView } from "../views/ListSuppliersView"
import { EditSuppliersView } from "../views/EditSuppliersView"
import { ProductsPage } from "../pages/ProductsPage"
import { CreateProductView } from "../views/CreateProductView"
import { EditProductView } from "../views/EditProductView"
import { ListProductsView } from "../views/ListProductsView"
import { UpdatePricesForSupplier } from "../pages/UpdatePricesForSupplier"
import { StockPage } from "../pages/StockPage"

export const AppRoutes = () => {
  return (
    <Drawer>
      <Routes>
        <Route path="/" element={<div className="text-4xl">Hola mundo desde <span className="text-red-500 font-bold text-xl uppercase">Home</span></div>} />
        <Route
          path="/categories"
          element={<CategoriesPage />}
        />
        <Route
          path="/suppliers"
          element={<SuppliersPage />}
        >
          <Route index element={<ListSuppliersView />} />
          <Route path="create" element={<CreateSuppliersView />} />
          <Route path="edit/:supplierId" element={<EditSuppliersView />} />
        </Route>
        <Route
          path="/products"
          element={<ProductsPage />}
        >
          <Route index element={<ListProductsView />} />
          <Route path="create" element={<CreateProductView />} />
          <Route path="edit/:productId" element={<EditProductView />} />
          <Route path="update-by-supplier" element={<UpdatePricesForSupplier />} />
        </Route>
        <Route
          path="/stock"
          element={<StockPage />}
        />



      </Routes>
    </Drawer>
  )
}
