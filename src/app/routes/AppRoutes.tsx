import { Route, Routes } from "react-router-dom"
import { Drawer } from "../../ui/components/drawer/Drawer"
import {
  CategoriesPage,
  ProductsPage,
  SuppliersPage,
  StockPage,
  SalesPage,
  UpdatePricesForSupplier,

} from "../pages/"
import {
  SaleInfoView,
  ListStockView,
  ImportStockView,
  ImportProductsView,
  EditProductView,
  CreateProductView,
  EditSuppliersView,
  CreateSuppliersView,
  AdjustmentStockView,
  ProductView
} from "../views/"
import { lazy, Suspense } from "react"
import { LoadingInfo } from "../../ui/components/loadings/LoadingInfo"

const HomePage = lazy(() => import('../pages/HomePage'))
const ListProductsView = lazy(() => import('../views/ListProductsView'))
const ListSalesView = lazy(() => import('../views/ListSalesView'));
const SalesView = lazy(() => import('../views/SalesView'));
const ListSuppliersView = lazy(() => import('../views/ListSuppliersView'));

export const AppRoutes = () => {
  return (
    <Drawer>
      <Routes>
        <Route path="/" element={

          <Suspense fallback={<LoadingInfo />}>
            <HomePage />
          </Suspense>
        }
        />
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
          <Route index element={
            <Suspense fallback={<LoadingInfo />}>

              <ListSuppliersView />
            </Suspense>
          }
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
            element={
              <Suspense fallback={<LoadingInfo />}>
                <ListProductsView />
              </Suspense>
            }
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

        </Route>
        <Route path="/sales" element={<SalesPage />}>
          <Route index element={
            <Suspense fallback={<LoadingInfo />}>
              <SalesView />
            </Suspense>
          }
          />
          <Route path="sale/:saleId" element={<SaleInfoView />} />
          <Route path="list" element={
            <Suspense fallback={<LoadingInfo />}>
              <ListSalesView />
            </Suspense>
          }
          />
        </Route>

      </Routes>
    </Drawer>
  )
}
