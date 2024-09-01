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
import { ProductView } from "../views/ProductView"
import { ListStockView } from "../views/ListStockView"
import { ImportStockView } from "../views/ImportStockView"
import { AdjustmentStockView } from "../views/AdjustmentStockView"
import { SalesPage } from "../pages/SalesPage"
import { SalesView } from "../views/SalesView"
import { ImportProductsView } from "../views/ImportProductsView"
import { ListSalesView } from "../views/ListSalesView"
import { SaleInfoView } from "../views/SaleInfoView"
import { HomePage } from "../pages/HomePage"

export const AppRoutes = () => {
  return (
    <Drawer>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
          <Route path=":productId" element={<ProductView />} />
          <Route path="edit/:productId" element={<EditProductView />} />
          <Route path="import" element={<ImportProductsView />} />
          <Route path="update-by-supplier" element={<UpdatePricesForSupplier />} />
        </Route>

        <Route path="/stock" element={<StockPage />}>
          <Route index element={<ListStockView />} />
          <Route path="import" element={<ImportStockView />} />
          <Route path="adjustment" element={<AdjustmentStockView />} />

        </Route>
        <Route path="/sales" element={<SalesPage />}>
          <Route index element={<SalesView />} />
          <Route path="sale/:saleId" element={<SaleInfoView />} />
          <Route path="list" element={<ListSalesView />} />
        </Route>

      </Routes>
    </Drawer>
  )
}
