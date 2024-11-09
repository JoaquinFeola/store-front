import { Route, Routes } from "react-router-dom"
import { Drawer } from "@/ui/components/drawer/"
import {
  HomePage,
  CategoriesPage,
  SuppliersPage,
  ProductsPage,
  UpdatePricesForSupplier,
  StockPage,
  SalesPage
} from "@/app/pages";

import {
  ListSuppliersView,
  CreateSuppliersView,
  EditSuppliersView,
  ListProductsView,
  CreateProductView,
  ProductView,
  EditProductView,
  ImportProductsView,
  ListStockView,
  ImportStockView,
  AdjustmentStockView,
  CreateAdjustmentStockView,
  SalesView,
  SaleInfoView,
  ListSalesView
} from "@/app/views";



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
          element={
            <SuppliersPage />
          }
        >
          <Route index element={<ListSuppliersView />}
          />
          <Route path="create" element={<CreateSuppliersView />} />
          <Route path="edit/:supplierId" element={<EditSuppliersView />} />
        </Route>
        <Route
          path="/products"
          element={<ProductsPage />}
        >
          <Route
            index
            element={<ListProductsView />}
          />
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
          <Route path="adjustment/create" element={<CreateAdjustmentStockView />} />

        </Route>
        <Route path="/sales" element={<SalesPage />}>
          <Route index element={<SalesView />}
          />
          <Route path="list/:saleId" element={<SaleInfoView />} />
          <Route path="list" element={<ListSalesView />}
          />
        </Route>

      </Routes>
    </Drawer>
  )
}
